import { map } from "rxjs";

import { BreakpointObserver } from "@angular/cdk/layout";
import { NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";

import { AiIcon } from "../icon/icon.component";
import { AiIconType } from "../icon/icons";
import { AiBreadcrumbImports } from "./breadcrumb.imports";
import { AiBreadcrumbService } from "./breadcrumb.service";
import { BreadcrumbVariants } from "./breadcrumb.variants";

const MOBILE_MAX_ITEMS = 2;

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
    #breakpointObserver = inject(BreakpointObserver);
    public router = inject(Router);

    readonly customSeparator = input<AiIconType>();
    readonly size = input<BreadcrumbVariants["size"]>("default");
    readonly maxItems = input<number>(0);

    actions = this.#breadcrumbService.actions;
    breadcrumbs = this.#breadcrumbService.breadcrumbs;

    protected isMobile = toSignal(this.#breakpointObserver.observe("(max-width: 639.98px)").pipe(map(state => state.matches)), { initialValue: false });

    protected visibleBreadcrumbs = computed(() => {
        const all = this.breadcrumbs();
        const configured = this.maxItems();
        const max = this.isMobile() ? (configured > 0 && configured < MOBILE_MAX_ITEMS ? configured : MOBILE_MAX_ITEMS) : configured;

        if (!max || max <= 0 || all.length <= max) return { visible: all, hidden: [] };

        const keepFirst = 1;
        const keepLast = max - 1;
        const hidden = all.slice(keepFirst, all.length - keepLast);
        const visible = [...all.slice(0, keepFirst), ...all.slice(all.length - keepLast)];
        return { visible, hidden };
    });
}
