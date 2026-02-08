import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from "@angular/core";
import { ClassValue } from "class-variance-authority/types";
import { mergeClasses } from "../../core";
import { breadcrumbPageVariants, BreadcrumbPageVariants } from "./breadcrumb.variants";

@Component({
    selector: "ai-breadcrumb-page",
    exportAs: "aiBreadcrumbPage",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <span aria-current="page" [class]="classes()">
            <ng-content />
        </span>
    `,
})
export class AiBreadcrumbPage {
    readonly variant = input<BreadcrumbPageVariants["variant"]>("default");
    readonly class = input<ClassValue>("");

    protected classes = computed(() => mergeClasses(breadcrumbPageVariants({ variant: this.variant() }), this.class()));
}
