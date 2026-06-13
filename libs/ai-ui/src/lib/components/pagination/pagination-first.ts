import { ClassValue } from "clsx";

import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from "@angular/core";

import { mergeClasses } from "../../core";
import { ButtonVariants } from "../button/button.variants";
import { AiIcon } from "../icon";
import { AiPaginationButton } from "./pagination-button";
import { AI_PAGINATION_INTL, AI_PAGINATION_INTL_DEFAULT } from "./pagination-intl";
import { paginationFirstVariants } from "./pagination.variants";

@Component({
    selector: "ai-pagination-first",
    exportAs: "aiPaginationFirst",
    imports: [AiIcon, AiPaginationButton],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <button type="button" ai-pagination-button [attr.disabled]="disabled() ? '' : null" [class]="classes()" [size]="size()" [disabled]="disabled()">
            <span class="sr-only">{{ intl.first }}</span>
            <ai-icon icon="skip-left" aria-hidden="true" />
        </button>
    `,
})
export class AiPaginationFirst {
    readonly intl = inject(AI_PAGINATION_INTL, { optional: true }) ?? AI_PAGINATION_INTL_DEFAULT;

    readonly class = input<ClassValue>("");
    readonly disabled = input(false, { transform: booleanAttribute });
    readonly size = input<ButtonVariants["size"]>("sm");

    protected readonly classes = computed(() => mergeClasses(paginationFirstVariants(), this.class()));
}
