import { computed, inject, Injectable, signal, TemplateRef } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";
import { AiBreadcrumbConfig } from "./breadcrumb.config";

@Injectable({
    providedIn: "root",
})
export class AiBreadcrumbService {
    #router = inject(Router);
    #activatedRoute = inject(ActivatedRoute);

    #breadcrumbs = signal<AiBreadcrumbConfig[]>([]);
    breadcrumbs = this.#breadcrumbs.asReadonly();

    #actions = signal<TemplateRef<unknown> | null>(null);
    actions = computed(() => this.#actions());

    constructor() {
        this.#router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
            const newBreadcrumbs = this._createBreadcrumbs(this.#activatedRoute.root);
            const filteredBreadcrumbs = this._filterBreadcrumbs(newBreadcrumbs);
            this.#breadcrumbs.set(filteredBreadcrumbs);
            this.#actions.update(() => null);
        });
    }

    update(template: TemplateRef<unknown>) {
        this.#actions.update(() => template);
    }

    private _createBreadcrumbs(route: ActivatedRoute, pathUrl = "", breadcrumbs: AiBreadcrumbConfig[] = []): AiBreadcrumbConfig[] {
        const children: ActivatedRoute[] = route.children;

        if (children.length === 0) return breadcrumbs;

        for (const child of children) {
            const routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");

            if (routeURL !== "") pathUrl += `/${routeURL}`;

            const label = child.snapshot.data["breadcrumb"];

            const icon = child.snapshot.routeConfig?.data?.["icon"];

            if (label && label.trim() !== "") {
                breadcrumbs.push({ label: label.trim(), path: pathUrl, icon });
            }

            return this._createBreadcrumbs(child, pathUrl, breadcrumbs);
        }

        return breadcrumbs;
    }

    /**
     * Filtra breadcrumbs para remover duplicatas consecutivas
     */
    private _filterBreadcrumbs(breadcrumbs: AiBreadcrumbConfig[]): AiBreadcrumbConfig[] {
        if (breadcrumbs.length <= 1) return breadcrumbs;

        const filtered: AiBreadcrumbConfig[] = [];
        let previousLabel = "";

        for (const breadcrumb of breadcrumbs) {
            if (breadcrumb.label !== previousLabel) {
                filtered.push(breadcrumb);
                previousLabel = breadcrumb.label;
            }
        }

        return filtered;
    }
}
