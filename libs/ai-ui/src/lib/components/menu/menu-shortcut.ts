import { ClassValue } from "clsx";

import { Component, computed, input, ViewEncapsulation } from "@angular/core";

import { mergeClasses } from "../../core";
import { menuShortcutVariants } from "./menu.variants";

@Component({
    selector: "ai-menu-shortcut, [ai-menu-shortcut]",
    exportAs: "aiMenuShortcut",
    encapsulation: ViewEncapsulation.None,
    template: ` <ng-content /> `,
    host: {
        "[class]": "classes()",
    },
})
export class AiMenuShortcut {
    readonly class = input<ClassValue>("");

    protected readonly classes = computed(() => mergeClasses(menuShortcutVariants(), this.class()));
}
