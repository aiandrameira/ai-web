import { Component } from "@angular/core";

import { AiPaginationImports } from "../pagination.imports";

@Component({
    selector: "ai-demo-pagination-default",
    imports: [AiPaginationImports],
    template: ` <ai-pagination [total]="5" [(pageIndex)]="currentPage" /> `,
})
export class DemoPaginationDefaultComponent {
    readonly currentPage = 2;
}
