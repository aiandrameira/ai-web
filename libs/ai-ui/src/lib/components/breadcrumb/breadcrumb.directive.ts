import { AfterViewInit, Directive, inject, OnDestroy, TemplateRef } from "@angular/core";

import { AiBreadcrumbService } from "./breadcrumb.service";

@Directive({
    selector: "[aiBreadcrumbActions]",
})
export class AiBreadcrumbActionsDirective implements AfterViewInit, OnDestroy {
    #breadcrumbService = inject(AiBreadcrumbService);
    readonly action = inject(TemplateRef);

    ngAfterViewInit() {
        if (!this.action) return;
        this.#breadcrumbService.update(this.action);
    }

    ngOnDestroy() {
        this.#breadcrumbService.clear(this.action);
    }
}
