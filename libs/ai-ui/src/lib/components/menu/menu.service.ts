import { OverlayRef } from "@angular/cdk/overlay";
import { ElementRef, inject, Injectable, signal, TemplateRef, ViewContainerRef } from "@angular/core";

import { KeyboardService } from "./keyboard.service";
import { OverlayService } from "./overlay.service";

@Injectable({
    providedIn: "root",
})
export class AiMenuService {
    #overlayService = inject(OverlayService);
    #keyboard = inject(KeyboardService);

    #overlayRef?: OverlayRef;
    #elementRef?: ElementRef;

    readonly opened = signal<boolean>(false);

    toggle(element: ElementRef, template: TemplateRef<unknown>, view: ViewContainerRef) {
        return this.opened() ? this.close() : this.open(element, template, view);
    }

    open(element: ElementRef, template: TemplateRef<unknown>, view: ViewContainerRef) {
        if (this.opened()) this.close();

        this.#elementRef = element;
        this.#overlayRef = this.#overlayService.create(element);

        if (!this.#overlayRef) return;

        this.#overlayService.attach(this.#overlayRef, template, view);
        this.opened.set(true);

        setTimeout(() => {
            this._focusMenu();
            this.#keyboard.focusFirst(this._getMenuItems());
        });

        this.#overlayRef.outsidePointerEvents().subscribe(() => this.close());
    }

    close() {
        this.#overlayService.detach(this.#overlayRef);
        this.#keyboard.reset();
        this.opened.set(false);
    }

    destroy() {
        this.#overlayService.destroy(this.#overlayRef);
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
                this.#elementRef?.nativeElement.focus();
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
}
