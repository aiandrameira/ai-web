import { Directive, ElementRef, HostListener, inject, input, OnInit, ViewContainerRef } from "@angular/core";

import { AiMenuContent } from "./menu-content";
import { AiMenuService } from "./menu.service";

@Directive({
    selector: "[ai-menu], [aiMenu]",
    exportAs: "aiMenu",
    host: {
        "[attr.tabindex]": "0",
        "[attr.role]": "'button'",
        "[attr.aria-haspopup]": "'menu'",
        "[attr.aria-expanded]": "menuService.opened()",
        "[attr.aria-disabled]": "disabled()",
    },
})
export class AiMenuDirective implements OnInit {
    #elementRef = inject(ElementRef);
    #viewContainerRef = inject(ViewContainerRef);

    protected menuService = inject(AiMenuService);

    menu = input<AiMenuContent>();
    trigger = input<"click" | "hover">("click");
    disabled = input<boolean>(false);

    ngOnInit() {
        const element = this.#elementRef.nativeElement;
        if (!element.hasAttribute("aria-label") && !element.hasAttribute("aria-labelledby")) {
            element.setAttribute("aria-label", element.textContent?.trim() || "Open menu");
        }
    }

    @HostListener("click", ["$event"])
    onClick(event: Event) {
        if (this.disabled() || this.trigger() !== "click") return;

        event.preventDefault();
        event.stopPropagation();

        const menuContent = this.menu();
        if (!menuContent) return;
        this.menuService.toggle(this.#elementRef, menuContent?.contentTemplate?.(), this.#viewContainerRef);
    }

    @HostListener("mouseenter")
    onMouseEnter() {
        if (this.disabled() || this.trigger() !== "hover") return;

        const menuContent = this.menu();
        if (!menuContent) return;
        this.menuService.open(this.#elementRef, menuContent?.contentTemplate?.(), this.#viewContainerRef);
    }

    @HostListener("mouseleave")
    onMouseLeave() {
        if (this.disabled() || this.trigger() !== "hover") return;
        this.menuService.close();
    }

    @HostListener("keydown", ["$event"])
    onKeydown(event: KeyboardEvent) {
        if (this.disabled()) return;

        switch (event.key) {
            case "Enter":
            case " ":
                event.preventDefault();
                event.stopPropagation();
                this._toggleMenu();
                break;
            case "ArrowDown":
                event.preventDefault();
                this._openMenu();
                break;
            case "Escape":
                event.preventDefault();
                this.menuService.close();
                this.#elementRef.nativeElement.focus();
                break;
        }
    }

    private _toggleMenu() {
        const menuContent = this.menu();
        if (!menuContent) return;
        this.menuService.toggle(this.#elementRef, menuContent?.contentTemplate?.(), this.#viewContainerRef);
    }

    private _openMenu() {
        const menuContent = this.menu();
        if (menuContent && !this.menuService.opened()) {
            this.menuService.open(this.#elementRef, menuContent?.contentTemplate?.(), this.#viewContainerRef);
        }
    }
}
