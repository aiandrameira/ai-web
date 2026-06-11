import { ClassValue } from "clsx";

import { OverlayModule, OverlayRef } from "@angular/cdk/overlay";
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    HostListener,
    inject,
    input,
    OnDestroy,
    output,
    signal,
    TemplateRef,
    viewChild,
    ViewContainerRef,
    ViewEncapsulation,
} from "@angular/core";

import { mergeClasses, transform } from "../../core";
import { KeyboardService } from "./keyboard.service";
import { menuContentVariants } from "./menu.variants";
import { OverlayService } from "./overlay.service";

@Component({
    selector: "ai-dropdown-menu",
    exportAs: "aiDropdownMenu",
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [OverlayModule],
    styleUrl: "./menu.css",
    template: `
        <div class="trigger-container inline-block" (click)="toggle()" (keydown.enter)="toggle()" (keydown.space)="toggle()" tabindex="0">
            <ng-content select="[menu-trigger]" />
        </div>

        <ng-template #menuTemplate>
            <div [class]="classes()" role="menu" [attr.data-state]="'open'" (keydown)="onKeydown($event)" tabindex="-1" [style.position]="'relative'" [style.z-index]="'9999'">
                <ng-content />
            </div>
        </ng-template>
    `,
    host: {
        "[attr.data-state]": "opened() ? 'open' : 'closed'",
        class: "relative inline-block text-left",
        "[style.position]": "'relative'",
    },
})
export class AiMenu implements OnDestroy {
    #elementRef = inject(ElementRef);
    #viewContainerRef = inject(ViewContainerRef);
    #keyboard = inject(KeyboardService);
    #overlayService = inject(OverlayService);

    #overlayRef?: OverlayRef;

    class = input<ClassValue>("");
    disabled = input(false, { transform });

    readonly menuTemplate = viewChild.required<TemplateRef<unknown>>("menuTemplate");

    readonly opened = signal<boolean>(false);

    changeOpen = output<boolean>();

    protected classes = computed(() => mergeClasses(menuContentVariants(), this.class()));

    ngOnDestroy() {
        this.#overlayService.destroy(this.#overlayRef);
    }

    @HostListener("document:click", ["$event"])
    onDocumentClick(event: Event) {
        if (!this.#elementRef.nativeElement.contains(event.target as Node)) {
            this.close();
        }
    }

    toggle() {
        return this.opened() ? this.close() : this.open();
    }

    open() {
        if (this.opened()) return;

        this.#overlayRef = this.#overlayService.create(this.#elementRef);
        this.#overlayService.attach(this.#overlayRef, this.menuTemplate(), this.#viewContainerRef);

        this.opened.set(true);

        setTimeout(() => {
            this._focusMenu();
            this.#keyboard.focusFirst(this._getMenuItems());
        });
    }

    close() {
        this.#overlayService.detach(this.#overlayRef);
        this.#keyboard.reset();
        this.opened.set(false);
    }

    onKeydown(event: KeyboardEvent) {
        const items = this._getMenuItems();

        switch (event.key) {
            case "ArrowDown":
                event.preventDefault();
                this.#keyboard.navigate(1, items);
                break;
            case "ArrowUp":
                event.preventDefault();
                this.#keyboard.navigate(-1, items);
                break;
            case "Enter":
            case " ":
                event.preventDefault();
                this.#keyboard.select(items);
                break;
            case "Escape":
                this.close();
                this._focusTrigger();
                break;
            case "Home":
                this.#keyboard.focusFirst(items);
                break;
            case "End":
                this.#keyboard.focusLast(items);
                break;
        }
    }

    private _getMenuItems(): HTMLElement[] {
        if (!this.#overlayRef?.hasAttached()) return [];
        const menuElement = this.#overlayRef.overlayElement;
        return Array.from(menuElement.querySelectorAll("menu-item, [menu-item]")).filter(item => !(item as HTMLElement).hasAttribute("data-disabled")) as HTMLElement[];
    }

    private _focusMenu() {
        if (this.#overlayRef?.hasAttached()) {
            const element = this.#overlayRef.overlayElement.querySelector('[role="menu"]') as HTMLElement;
            if (!element) return;
            element.focus();
        }
    }

    private _focusTrigger() {
        this.#elementRef.nativeElement.querySelector(".trigger-container")?.focus();
    }
}
