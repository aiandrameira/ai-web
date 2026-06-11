import { ClassValue } from "class-variance-authority/types";

import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from "@angular/core";

import { mergeClasses } from "../../core";
import { breadcrumbItemVariants, BreadcrumbItemVariants } from "./breadcrumb.variants";

@Component({
    selector: "ai-breadcrumb-item",
    exportAs: "aiBreadcrumbItem",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <li [class]="classes()">
            <ng-content />
        </li>
    `,
})
export class AiBreadcrumbItem {
    readonly variant = input<BreadcrumbItemVariants["variant"]>("default");
    readonly shape = input<BreadcrumbItemVariants["shape"]>("default");
    readonly class = input<ClassValue>("");

    protected classes = computed(() => mergeClasses(breadcrumbItemVariants({ variant: this.variant(), shape: this.shape() }), this.class()));
}
