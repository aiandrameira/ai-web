import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from "@angular/core";
import { ClassValue } from "class-variance-authority/types";
import { mergeClasses } from "../../core";
import { breadcrumbListVariants, BreadcrumbListVariants } from "./breadcrumb.variants";

@Component({
    selector: "ai-breadcrumb-list",
    exportAs: "aiBreadcrumbList",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <ol [class]="classes()">
            <ng-content />
        </ol>
    `,
})
export class AiBreadcrumbList {
    readonly align = input<BreadcrumbListVariants["align"]>("start");
    readonly wrap = input<BreadcrumbListVariants["wrap"]>("wrap");

    readonly class = input<ClassValue>("");

    protected classes = computed(() => mergeClasses(breadcrumbListVariants({ align: this.align(), wrap: this.wrap() }), this.class()));
}
