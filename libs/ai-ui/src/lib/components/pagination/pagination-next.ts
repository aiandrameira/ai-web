import { ClassValue } from "clsx";

import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from "@angular/core";

import { mergeClasses } from "../../core";
import { ButtonVariants } from "../button/button.variants";
import { AiIcon } from "../icon";
import { AiPaginationButton } from "./pagination-button";
import { AI_PAGINATION_INTL, AI_PAGINATION_INTL_DEFAULT } from "./pagination-intl";
import { paginationNextVariants } from "./pagination.variants";

@Component({
    selector: "ai-pagination-next",
    exportAs: "aiPaginationNext",
    imports: [AiIcon, AiPaginationButton],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <button type="button" ai-pagination-button [attr.disabled]="disabled() ? '' : null" [class]="classes()" [size]="size()" [disabled]="disabled()">
            <span class="sr-only">To next page</span>
            <span class="hidden sm:block" aria-hidden="true">{{ intl.next }}</span>
            <ai-icon icon="arrow-right-s" aria-hidden="true" />
        </button>
    `,
})
export class AiPaginationNext {
    readonly intl = inject(AI_PAGINATION_INTL, { optional: true }) ?? AI_PAGINATION_INTL_DEFAULT;

    readonly class = input<ClassValue>("");
    readonly disabled = input(false, { transform: booleanAttribute });
    readonly size = input<ButtonVariants["size"]>("default");

    protected readonly classes = computed(() => mergeClasses(paginationNextVariants(), this.class()));
}
