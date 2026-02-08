import { NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { AiIcon } from "../icon/icon.component";
import { AiIconType } from "../icon/icons";
import { AiBreadcrumbImports } from "./breadcrumb.imports";
import { AiBreadcrumbService } from "./breadcrumb.service";
import { BreadcrumbVariants } from "./breadcrumb.variants";

@Component({
    selector: "tvc-breadcrumb",
    exportAs: "tvcBreadcrumb",
    imports: [AiBreadcrumbImports, NgTemplateOutlet, AiIcon],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    templateUrl: "./breadcrumb.html",
})
export class AiBreadcrumb {
    #breadcrumbService = inject(AiBreadcrumbService);
    public router = inject(Router);

    readonly customSeparator = input<AiIconType>();
    readonly size = input<BreadcrumbVariants["size"]>("default");

    actions = this.#breadcrumbService.actions;
    breadcrumbs = this.#breadcrumbService.breadcrumbs;
}
