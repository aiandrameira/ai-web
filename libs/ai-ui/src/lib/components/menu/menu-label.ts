import { ClassValue } from "clsx";

import { Component, computed, input, ViewEncapsulation } from "@angular/core";

import { mergeClasses, transform } from "../../core";
import { menuLabelVariants } from "./menu.variants";

@Component({
    selector: "ai-menu-label, [ai-menu-label]",
    exportAs: "aiMenuLabel",
    encapsulation: ViewEncapsulation.None,
    template: ` <ng-content /> `,
    host: {
        "[class]": "classes()",
        "[attr.data-inset]": "inset() || null",
    },
})
export class AiMenuLabel {
    readonly inset = input(false, { transform });
    readonly class = input<ClassValue>("");

    protected classes = computed(() => mergeClasses(menuLabelVariants({ inset: this.inset() }), this.class()));
}
