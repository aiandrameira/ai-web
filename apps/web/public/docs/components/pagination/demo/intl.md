```angular-ts showLineNumbers copyButton
import { Component, computed, signal } from "@angular/core";

import { AI_PAGINATION_INTL, AI_PAGINATION_INTL_PT_BR } from "../pagination-intl";
import { AiPaginationImports } from "../pagination.imports";

@Component({
    selector: "demo-pagination-intl",
    imports: [AiPaginationImports],
    providers: [{ provide: AI_PAGINATION_INTL, useValue: AI_PAGINATION_INTL_PT_BR }],
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
export class DemoPaginationIntlComponent {
    readonly totalItems = 50;
    readonly currentPage = signal(1);
    readonly pageSize = signal(10);
    readonly totalPages = computed(() => Math.ceil(this.totalItems / this.pageSize()));
}
```
