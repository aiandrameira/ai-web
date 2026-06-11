import { ClassValue } from "class-variance-authority/types";

import { ChangeDetectionStrategy, Component, computed, input, TemplateRef, ViewEncapsulation } from "@angular/core";

import { mergeClasses } from "../../core";
import { AiIcon } from "../icon/icon.component";
import { breadcrumbSeparatorVariants, BreadcrumbSeparatorVariants } from "./breadcrumb.variants";

@Component({
    selector: "ai-breadcrumb-separator",
    exportAs: "aiBreadcrumbSeparator",
    imports: [AiIcon],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <li aria-hidden="true" role="presentation" [class]="classes()">
            <ng-content>
                <ai-icon icon="arrow-right-s" />
            </ng-content>
        </li>
    `,
})
export class AiBreadcrumbSeparator {
    readonly separator = input<string | TemplateRef<void> | null>("/");
    readonly variant = input<BreadcrumbSeparatorVariants["variant"]>("default");
    readonly class = input<ClassValue>("");

    protected classes = computed(() => mergeClasses(breadcrumbSeparatorVariants({ variant: this.variant() }), this.class()));
}
