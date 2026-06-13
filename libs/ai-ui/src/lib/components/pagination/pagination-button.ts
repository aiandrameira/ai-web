import { ClassValue } from "clsx";

import { mergeClasses } from "@ai-ui/core";
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
        <ai-button [attr.data-active]="active() || null" [class]="classes()" [disabled]="disabled()" [size]="size()" [variant]="variant()" shape="circle">
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
    readonly size = input<ButtonVariants["size"]>("sm");

    protected readonly variant = computed<ButtonVariants["variant"]>(() => (this.active() ? "primary" : "ghost"));
    protected classes = computed(() =>
        mergeClasses(
            this.disabled() ? "bg-transparent opacity-50" : "",
            this.active() ? "bg-primary/12 hover:bg-primary/18 text-primary" : "text-muted-foreground/80",
            { variant: this.variant() },
            this.class(),
        ),
    );
}
