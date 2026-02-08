import { Component, computed, inject, signal } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ScrollDirective, ScrollItemDirective } from "@core/directives";
import { ComponentData, components } from "@domain/constants";
import { NavigationConfigDto } from "@domain/dtos";
import { CodePreview, Content, Markdown } from "@views/shared";

@Component({
    selector: "ai-component",
    imports: [Content, CodePreview, ScrollDirective, ScrollItemDirective, Markdown],
    templateUrl: "./component.html",
})
export class AiComponent {
    #activatedRoute = inject(ActivatedRoute);
    #router = inject(Router);
    #title = inject(Title);

    activeSummary?: string;
    dataComponent = signal<ComponentData | null>(null);

    example = computed(() => this.dataComponent()?.examples[0]);

    navigations = signal<NavigationConfigDto>({
        items: [
            { id: "overview", label: "Nesta página", type: "core" },
            { id: "installation", label: "Instalação", type: "core" },
            { id: "examples", label: "Exemplos", type: "core", children: [] },
            { id: "api", label: "API", type: "core" },
        ],
    });

    constructor() {
        this.#activatedRoute.params.subscribe(() => this._load());
        this._load();
    }

    setPageTitle() {
        const componentName = this.dataComponent()?.componentName;
        if (!componentName) return;
        const capitalizedText = componentName[0].toUpperCase() + componentName.slice(1);
        const pageTitle = `AI • ${capitalizedText}`;
        this.#title.setTitle(pageTitle);
    }

    private _load() {
        const componentName = this.#activatedRoute.snapshot.paramMap.get("componentName");
        if (!componentName) {
            this.#router.navigateByUrl("/");
            return;
        }

        const component = components.find(item => item.componentName === componentName);
        if (!componentName) {
            this.#router.navigateByUrl("/");
            return;
        }

        this.dataComponent.set(component || null);

        const examples = this.navigations().items.find(item => item.id === "examples");

        if (examples) {
            examples.children = component?.examples.map(example => ({ id: example.name, label: example.name, type: "custom" }));
        }
        this.setPageTitle();
    }
}
