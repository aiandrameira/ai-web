import { NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";

import { AiIcon } from "../icon/icon.component";
import { AiIconType } from "../icon/icons";
import { AiBreadcrumbImports } from "./breadcrumb.imports";
import { AiBreadcrumbService } from "./breadcrumb.service";
import { BreadcrumbVariants } from "./breadcrumb.variants";

@Component({
    selector: "ai-breadcrumb",
    exportAs: "aiBreadcrumb",
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
    readonly maxItems = input<number>(0);

    actions = this.#breadcrumbService.actions;
    breadcrumbs = this.#breadcrumbService.breadcrumbs;

    protected visibleBreadcrumbs = computed(() => {
        const all = this.breadcrumbs();
        const max = this.maxItems();
        if (!max || max <= 0 || all.length <= max) return { visible: all, hidden: [] };

        const keepFirst = 1;
        const keepLast = max - 1;
        const hidden = all.slice(keepFirst, all.length - keepLast);
        const visible = [...all.slice(0, keepFirst), ...all.slice(all.length - keepLast)];
        return { visible, hidden };
    });
}
