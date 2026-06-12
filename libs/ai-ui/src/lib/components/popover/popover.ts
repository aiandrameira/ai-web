import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from "@angular/core";

import { mergeClasses } from "../../core";
import { popoverVariants } from "./popover.variants";

@Component({
    selector: "ai-popover",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: ` <ng-content /> `,
    host: {
        "[class]": "classes()",
    },
})
export class AiPopover {
    readonly class = input<string>("");

    protected readonly classes = computed(() => mergeClasses(popoverVariants(), this.class()));
}
