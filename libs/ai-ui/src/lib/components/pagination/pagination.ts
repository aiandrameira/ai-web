import { ClassValue } from "clsx";

import { mergeClasses } from "@ai-ui/core";
import { NgTemplateOutlet } from "@angular/common";
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, model, output, TemplateRef, ViewEncapsulation } from "@angular/core";

import { ButtonVariants } from "../button/button.variants";
import { AiSelectImports } from "../form-field";
import { AiPaginationButton } from "./pagination-button";
import { AiPaginationContent } from "./pagination-content";
import { AiPaginationEllipsis } from "./pagination-ellipsis";
import { AI_PAGINATION_INTL, AI_PAGINATION_INTL_DEFAULT, AiPaginationIntl } from "./pagination-intl";
import { AiPaginationItem } from "./pagination-item";
import { AiPaginationNext } from "./pagination-next";
import { AiPaginationPrev } from "./pagination-prev";
import { paginationVariants } from "./pagination.variants";

@Component({
    selector: "ai-pagination",
    exportAs: "aiPagination",
    imports: [AiPaginationContent, AiPaginationItem, AiPaginationButton, AiPaginationPrev, AiPaginationNext, AiPaginationEllipsis, NgTemplateOutlet, AiSelectImports],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        @if (content()) {
            <ng-container *ngTemplateOutlet="content()" />
        } @else {
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
                @if (showInfo() && totalItems()) {
                    <span class="text-sm text-muted-foreground whitespace-nowrap">
                        <span class="text-primary font-semibold">{{ totalItems() }}</span>
                        {{ intl.totalItems }} | {{ total() }} {{ intl.pages }}
                    </span>
                }

                @if (showPageSize()) {
                    <div class="flex items-center gap-2 whitespace-nowrap">
                        <ai-select [value]="pageSize()" size="sm" (selectedValueChange)="onPageSizeChange($event)">
                            @for (opt of pageSizeOptions(); track opt) {
                                <ai-select-item [value]="opt"> {{ opt }} {{ intl.perPage }} </ai-select-item>
                            }
                        </ai-select>
                    </div>
                }

                <ul ai-pagination-content>
                    <li ai-pagination-item>
                        @let prev = Math.max(1, pageIndex() - 1);
                        <ai-pagination-prev [size]="size()" [disabled]="disabled() || pageIndex() === 1" (click)="onPageChange(prev)" />
                    </li>

                    @for (item of visiblePages(); track item) {
                        @if (item === "ellipsis") {
                            <li ai-pagination-item>
                                <ai-pagination-ellipsis />
                            </li>
                        } @else {
                            <li ai-pagination-item>
                                <button
                                    ai-pagination-button
                                    type="button"
                                    class="focus-visible:rounded-md"
                                    [attr.aria-current]="item === pageIndex() ? 'page' : null"
                                    [attr.aria-disabled]="disabled() || null"
                                    [active]="item === pageIndex()"
                                    [disabled]="disabled()"
                                    [size]="size()"
                                    (click)="onPageChange(item)"
                                >
                                    <span class="sr-only">{{ item === total() ? "To last page, page" : "To page" }}</span>
                                    {{ item }}
                                </button>
                            </li>
                        }
                    }

                    <li ai-pagination-item>
                        @let next = Math.min(pageIndex() + 1, total());
                        <ai-pagination-next [size]="size()" [disabled]="disabled() || pageIndex() === total()" (click)="onPageChange(next)" />
                    </li>
                </ul>
            </div>
        }
    `,
    host: {
        role: "group",
        "[attr.aria-label]": "ariaLabel()",
        "data-slot": "pagination",
        "[class]": "classes()",
    },
})
export class AiPagination {
    readonly intl: AiPaginationIntl = inject(AI_PAGINATION_INTL, { optional: true }) ?? AI_PAGINATION_INTL_DEFAULT;

    readonly pageIndex = model<number>(1);
    readonly total = input<number>(1);
    readonly totalItems = input<number>(0);
    readonly pageSize = model<number>(10);
    readonly pageSizeOptions = input<number[]>([10, 20, 50, 100]);
    readonly siblingCount = input<number>(1);
    readonly showInfo = input(false, { transform: booleanAttribute });
    readonly showPageSize = input(false, { transform: booleanAttribute });
    readonly size = input<ButtonVariants["size"]>("default");
    readonly disabled = input(false, { transform: booleanAttribute });
    readonly content = input<TemplateRef<void> | undefined>();
    readonly ariaLabel = input("Pagination");

    readonly class = input<ClassValue>("");

    readonly pageIndexChange = output<number>();
    readonly pageSizeChange = output<number>();
    readonly Math = Math;

    protected readonly classes = computed(() => mergeClasses(paginationVariants(), this.class()));
    readonly pages = computed<number[]>(() => Array.from({ length: Math.max(0, this.total()) }, (_, i) => i + 1));

    readonly visiblePages = computed<(number | "ellipsis")[]>(() => {
        const total = this.total();
        const current = this.pageIndex();
        const sibling = this.siblingCount();
        const totalSlots = sibling * 2 + 5;

        if (total <= totalSlots) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }

        const leftSibling = Math.max(current - sibling, 1);
        const rightSibling = Math.min(current + sibling, total);
        const showLeft = leftSibling > 2;
        const showRight = rightSibling < total - 1;

        if (!showLeft && showRight) {
            const count = 3 + 2 * sibling;
            return [...Array.from({ length: count }, (_, i) => i + 1), "ellipsis", total];
        }

        if (showLeft && !showRight) {
            const count = 3 + 2 * sibling;
            return [1, "ellipsis", ...Array.from({ length: count }, (_, i) => total - count + i + 1)];
        }

        return [1, "ellipsis", ...Array.from({ length: rightSibling - leftSibling + 1 }, (_, i) => leftSibling + i), "ellipsis", total];
    });

    onPageChange(page: number): void {
        if (!this.disabled() && page !== this.pageIndex()) {
            this.pageIndex.set(page);
            this.pageIndexChange.emit(page);
        }
    }

    onPageSizeChange(value: unknown): void {
        const size = Number(value);
        this.pageSize.set(size);
        this.pageSizeChange.emit(size);
        this.onPageChange(1);
    }
}
