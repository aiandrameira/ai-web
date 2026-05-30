import { ClassValue } from "clsx";

import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from "@angular/core";

import { AiButton } from "../button";
import { ButtonVariants } from "../button/button.variants";

@Component({
    selector: "button[ai-pagination-button], a[ai-pagination-button]",
    exportAs: "aiPaginationButton",
    imports: [AiButton],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <ai-button [attr.data-active]="active() || null" [class]="class()" [disabled]="disabled()" [size]="size()" [variant]="variant()">
            <ng-content />
        </ai-button>
    `,
    host: {
        "data-slot": "pagination-button",
    },
})
export class AiPaginationButton {
    readonly class = input<ClassValue>("");
    readonly active = input(false, { transform: booleanAttribute });
    readonly disabled = input(false, { transform: booleanAttribute });
    readonly size = input<ButtonVariants["size"]>("default");

    protected readonly variant = computed<ButtonVariants["variant"]>(() => (this.active() ? "primary" : "ghost"));
}
