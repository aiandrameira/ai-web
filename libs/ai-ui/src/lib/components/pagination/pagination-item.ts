import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "li[ai-pagination-item]",
    exportAs: "aiPaginationItem",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: ` <ng-content /> `,
    host: {
        "data-slot": "pagination-item",
    },
})
export class AiPaginationItem {}
