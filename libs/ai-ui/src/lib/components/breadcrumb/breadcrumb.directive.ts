import { AfterViewInit, Directive, inject, TemplateRef } from "@angular/core";

import { AiBreadcrumbService } from "./breadcrumb.service";

@Directive({
    selector: "[aiBreadcrumbActions]",
})
export class AiBreadcrumbActionsDirective implements AfterViewInit {
    #breadcrumbService = inject(AiBreadcrumbService);
    readonly action = inject(TemplateRef);

    ngAfterViewInit() {
        if (!this.action) return;
        this.#breadcrumbService.update(this.action);
    }
}
