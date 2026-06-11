import { ClassValue } from "class-variance-authority/types";

import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from "@angular/core";

import { mergeClasses } from "../../core";
import { breadcrumbVariants, BreadcrumbVariants } from "./breadcrumb.variants";

@Component({
    selector: "ai-breadcrumb-content",
    exportAs: "aiBreadcrumbContent",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <nav aria-label="breadcrumb" [class]="classes()">
            <ng-content />
        </nav>
    `,
})
export class AiBreadcrumbContent {
    readonly size = input<BreadcrumbVariants["size"]>("default");
    readonly class = input<ClassValue>("");

    protected classes = computed(() => mergeClasses(breadcrumbVariants({ size: this.size() }), this.class()));
}
