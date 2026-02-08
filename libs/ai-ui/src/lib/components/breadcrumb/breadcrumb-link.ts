import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ClassValue } from "class-variance-authority/types";
import { mergeClasses } from "../../core";
import { breadcrumbLinkVariants, BreadcrumbLinkVariants } from "./breadcrumb.variants";

@Component({
    selector: "ai-breadcrumb-link",
    exportAs: "aiBreadcrumbLink",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [RouterLink],
    template: `
        <a [routerLink]="link()" [class]="classes()">
            <ng-content />
        </a>
    `,
})
export class AiBreadcrumbLink {
    readonly link = input<string>("/");
    readonly variant = input<BreadcrumbLinkVariants["variant"]>("default");
    readonly class = input<ClassValue>("");

    protected classes = computed(() => mergeClasses(breadcrumbLinkVariants({ variant: this.variant() }), this.class()));
}
