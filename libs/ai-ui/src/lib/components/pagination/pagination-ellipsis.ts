import { ClassValue } from "clsx";

import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from "@angular/core";

import { mergeClasses } from "../../core";
import { AiIcon } from "../icon";
import { paginationEllipsisVariants } from "./pagination.variants";

@Component({
    selector: "ai-pagination-ellipsis",
    exportAs: "aiPaginationEllipsis",
    imports: [AiIcon],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: ` <ai-icon icon="more" aria-hidden="true" /> `,
    host: {
        "[class]": "classes()",
        "aria-hidden": "true",
    },
})
export class AiPaginationEllipsis {
    readonly class = input<ClassValue>("");

    protected readonly classes = computed(() => mergeClasses(paginationEllipsisVariants(), this.class()));
}
