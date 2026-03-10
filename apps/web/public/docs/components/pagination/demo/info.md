```angular-ts showLineNumbers copyButton
import { Component, computed, signal } from "@angular/core";

import { AiPaginationImports } from "../pagination.imports";

@Component({
    selector: "demo-pagination-info",
    imports: [AiPaginationImports],
    template: `
        <div class="w-full max-w-150">
            <ai-pagination
                size="sm"
                [total]="totalPages()"
                [totalItems]="totalItems"
                [(pageIndex)]="currentPage"
                [(pageSize)]="pageSize"
                [pageSizeOptions]="[10, 20, 50]"
                showInfo
                showPageSize
            />
        </div>
    `,
})
export class DemoPaginationInfoComponent {
    readonly totalItems = 100;
    readonly currentPage = signal(1);
    readonly pageSize = signal(10);
    readonly totalPages = computed(() => Math.ceil(this.totalItems / this.pageSize()));
}
```
