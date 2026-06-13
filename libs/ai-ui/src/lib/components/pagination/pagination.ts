import { ClassValue } from "clsx";

import { NgTemplateOutlet } from "@angular/common";
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, model, output, TemplateRef, ViewEncapsulation } from "@angular/core";

import { mergeClasses } from "../../core";
import { ButtonVariants } from "../button/button.variants";
import { AiSelectImports } from "../form-field";
import { AiPaginationButton } from "./pagination-button";
import { AiPaginationContent } from "./pagination-content";
import { AiPaginationEllipsis } from "./pagination-ellipsis";
import { AiPaginationFirst } from "./pagination-first";
import { AI_PAGINATION_INTL, AI_PAGINATION_INTL_DEFAULT, AiPaginationIntl } from "./pagination-intl";
import { AiPaginationItem } from "./pagination-item";
import { AiPaginationLast } from "./pagination-last";
import { AiPaginationNext } from "./pagination-next";
import { AiPaginationPrev } from "./pagination-prev";
import { paginationVariants } from "./pagination.variants";

@Component({
    selector: "ai-pagination",
    exportAs: "aiPagination",
    imports: [
        AiPaginationContent,
        AiPaginationItem,
        AiPaginationButton,
        AiPaginationFirst,
        AiPaginationPrev,
        AiPaginationNext,
        AiPaginationLast,
        AiPaginationEllipsis,
        NgTemplateOutlet,
        AiSelectImports,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    templateUrl: "./pagination.html",
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
    readonly pageWindowSize = input<number>(5);
    readonly showInfo = input(false, { transform: booleanAttribute });
    readonly showPageSize = input(false, { transform: booleanAttribute });
    readonly showFirstLast = input(false, { transform: booleanAttribute });
    readonly size = input<ButtonVariants["size"]>("sm");
    readonly disabled = input(false, { transform: booleanAttribute });
    readonly content = input<TemplateRef<void> | undefined>();
    readonly ariaLabel = input("Pagination");

    readonly class = input<ClassValue>("");

    readonly changePageIndex = output<number>();
    readonly changePageSize = output<number>();
    readonly Math = Math;

    protected readonly classes = computed(() => mergeClasses(paginationVariants(), this.class()));
    readonly pages = computed<number[]>(() => Array.from({ length: Math.max(0, this.total()) }, (_, i) => i + 1));
    readonly infoStart = computed(() => (this.pageIndex() - 1) * this.pageSize() + 1);
    readonly infoEnd = computed(() => Math.min(this.pageIndex() * this.pageSize(), this.totalItems()));

    readonly visiblePages = computed<(number | "ellipsis")[]>(() => {
        const total = this.total();
        const current = this.pageIndex();
        const sibling = this.siblingCount();
        const totalSlots = sibling * 2 + this.pageWindowSize();

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
            this.changePageIndex.emit(page);
        }
    }

    onPageSizeChange(value: unknown): void {
        const size = Number(value);
        this.pageSize.set(size);
        this.changePageSize.emit(size);
        this.onPageChange(1);
    }
}
