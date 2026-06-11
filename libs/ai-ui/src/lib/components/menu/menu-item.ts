import { ClassValue } from "clsx";

import { Component, computed, HostListener, inject, input, ViewEncapsulation } from "@angular/core";

import { mergeClasses, transform } from "../../core";
import { AiMenuService } from "./menu.service";
import { AiMenuItemVariants, menuItemVariants } from "./menu.variants";

@Component({
    selector: "ai-menu-item, [ai-menu-item]",
    exportAs: "aiMenuItem",
    encapsulation: ViewEncapsulation.None,
    template: ` <ng-content /> `,
    host: {
        "[class]": "classes()",
        "[attr.data-disabled]": "disabled() || null",
        "[attr.data-variant]": "variant()",
        "[attr.data-inset]": "inset() || null",
        "[attr.aria-disabled]": "disabled()",
        role: "menuitem",
        tabindex: "-1",
    },
})
export class AiMenuItem {
    #menuService = inject(AiMenuService);

    readonly variant = input<AiMenuItemVariants["variant"]>("default");
    readonly inset = input(false, { transform });
    readonly disabled = input(false, { transform });
    readonly class = input<ClassValue>("");

    @HostListener("click", ["$event"])
    onClick(event: Event) {
        if (this.disabled()) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        setTimeout(() => this.#menuService.close(), 0);
    }

    protected classes = computed(() => mergeClasses(menuItemVariants({ variant: this.variant(), inset: this.inset() }), this.class()));
}
