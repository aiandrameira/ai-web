```angular-ts showLineNumbers copyButton
import { Component, signal } from "@angular/core";

import { AiPaginationImports } from "../pagination.imports";

@Component({
    selector: "ai-demo-pagination-custom",
    imports: [AiPaginationImports],
    template: `
        <ai-pagination [total]="total" [pageIndex]="currentPage()" (pageIndexChange)="goToPage($event)" [content]="content" />

        <ng-template #content>
            <ul ai-pagination-content>
                <li ai-pagination-item>
                    <ai-pagination-prev (click)="goToPrevious()" [disabled]="currentPage() === 1" />
                </li>

                @for (page of pages(); track page) {
                    <li ai-pagination-item>
                        <button type="button" ai-pagination-button [active]="page === currentPage()" (click)="goToPage(page)">
                            <span class="sr-only">To page</span>
                            {{ page }}
                        </button>
                    </li>
                }

                <li ai-pagination-item>
                    <ai-pagination-ellipsis />
                </li>

                <li ai-pagination-item>
                    <ai-pagination-next (click)="goToNext()" [disabled]="currentPage() === total" />
                </li>
            </ul>
        </ng-template>
    `,
})
export class DemoPaginationCustomComponent {
    readonly total = 5;
    readonly currentPage = signal(3);

    readonly pages = signal<number[]>(Array.from({ length: this.total }, (_, i) => i + 1));

    goToPage(page: number) {
        this.currentPage.set(page);
    }

    goToPrevious() {
        if (this.currentPage() > 1) {
            this.currentPage.update(p => p - 1);
        }
    }

    goToNext() {
        if (this.currentPage() < this.total) {
            this.currentPage.update(p => p + 1);
        }
    }
}
```
