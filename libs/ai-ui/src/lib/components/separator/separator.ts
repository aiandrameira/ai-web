import { ClassValue } from "clsx";

import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from "@angular/core";

import { mergeClasses } from "../../core";
import { separatorVariants, SeparatorVariants } from "./separator.variants";

@Component({
    selector: "ai-separator",
    exportAs: "aiSeparator",
    template: "",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        "[class]": "classes()",
    },
})
export class AiSeparator {
    orientation = input<SeparatorVariants["orientation"]>("horizontal");

    class = input<ClassValue>("");

    protected classes = computed(() => mergeClasses(separatorVariants({ orientation: this.orientation() }), this.class()));
}
