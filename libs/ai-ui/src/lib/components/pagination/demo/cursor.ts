import { Component, computed, signal } from "@angular/core";

import { AiPaginationImports } from "../pagination.imports";

@Component({
    selector: "ai-demo-pagination-cursor",
    imports: [AiPaginationImports],
    template: `
        <div class="w-full max-w-150">
            <ai-pagination
                mode="cursor"
                size="sm"
                [total]="totalPages()"
                [totalItems]="totalItems"
                [(pageIndex)]="currentPage"
                [(pageSize)]="pageSize"
                [pageSizeOptions]="[10, 20, 50]"
                showInfo
                showPageSize
                showFirstLast
            />
        </div>
    `,
})
export class DemoPaginationCursorComponent {
    readonly totalItems = 5493;
    readonly currentPage = signal(2);
    readonly pageSize = signal(20);
    readonly totalPages = computed(() => Math.ceil(this.totalItems / this.pageSize()));
}
