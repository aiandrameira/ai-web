import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, input, signal, ViewEncapsulation } from "@angular/core";
import { ClassValue } from "clsx";
import { mergeClasses, transform } from "../../core";
import { AiIcon } from "../icon/icon.component";
import { AiIconType } from "../icon/icons";
import { AiCommand } from "./command";
import { AiCommandItemGroup } from "./command-item-group";
import { CommandItemVariants, commandItemVariants, commandShortcutVariants } from "./command.variants";

@Component({
    selector: "ai-command-item",
    exportAs: "aiCommandItem",
    imports: [AiIcon],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        @if (visibledItem()) {
        <div
            [class]="classes()"
            [attr.role]="'item'"
            [attr.disabled]="disabled()"
            [attr.aria-selected]="selected()"
            [attr.data-selected]="selected()"
            [attr.data-disabled]="disabled()"
            [attr.tabindex]="0"
            (click)="onChange()"
            (keydown.{enter,space}.prevent)="onChange()"
            (mouseenter)="onMouseEnter()"
        >
            @let nameIcon = icon(); @if (nameIcon) {
            <ai-icon [icon]="nameIcon!" class="mr-2 flex shrink-0 items-center justify-center" />
            }
            <span class="flex-1">{{ label() }}</span>
            @if (shortcut()) {
            <span [class]="shortcutClasses()">{{ shortcut() }}</span>
            }
        </div>
        }
    `,
})
export class AiCommandItem {
    readonly #elementRef = inject(ElementRef);
    readonly #cmdComponent = inject(AiCommand, { optional: true });

    readonly value = input.required<unknown>();
    readonly label = input.required<string>();
    readonly command = input<string>("");
    readonly icon = input<AiIconType>();
    readonly shortcut = input<string>("");
    readonly disabled = input(false, { transform });
    readonly variant = input<CommandItemVariants>("default");
    readonly class = input<ClassValue>("");
    readonly parentCommand = input<AiCommand | null>(null);
    readonly commandItemGroup = input<AiCommandItemGroup | null>(null);

    readonly selected = signal<boolean>(false);

    protected readonly classes = computed(() =>
        mergeClasses(commandItemVariants({ variant: this.variant() }), this.selected() ? "bg-default text-default-foreground" : "", this.class())
    );
    protected readonly shortcutClasses = computed(() => mergeClasses(commandShortcutVariants()));

    protected readonly visibledItem = computed(() => {
        const parent = this.#cmdComponent;
        if (!parent) return true;

        return !parent.searchTerm() || parent.filteredItems().includes(this);
    });

    constructor() {
        effect(onCleanup => {
            const cmd = this.parentCommand();
            const grp = this.commandItemGroup();

            if (cmd) {
                cmd.register(this);
                onCleanup(() => cmd.unregister(this));
            }

            if (grp) {
                grp.register(this);
                onCleanup(() => grp.unregister(this));
            }
        });
    }

    onChange() {
        if (this.disabled()) return;
        this.#cmdComponent?.selectItem(this);
    }

    onMouseEnter() {
        if (this.disabled()) return;
    }

    setSelected(selected: boolean) {
        this.selected.set(selected);
    }

    focus() {
        const element = this.#elementRef.nativeElement;
        element.focus();
        element.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
}
