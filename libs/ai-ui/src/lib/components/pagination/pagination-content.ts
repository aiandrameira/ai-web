import { ClassValue } from "clsx";

import { mergeClasses } from "@ai-ui/core";
import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from "@angular/core";

import { paginationContentVariants } from "./pagination.variants";

@Component({
    selector: "ul[ai-pagination-content]",
    exportAs: "aiPaginationContent",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: ` <ng-content /> `,
    host: {
        "data-slot": "pagination-content",
        "[class]": "classes()",
    },
})
export class AiPaginationContent {
    readonly class = input<ClassValue>("");

    protected readonly classes = computed(() => mergeClasses(paginationContentVariants(), this.class()));
}
