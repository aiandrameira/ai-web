import { ChangeDetectionStrategy, Component, computed, effect, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ScrollDirective, ScrollItemDirective } from "@core/directives";
import { ComponentData, components } from "@domain/constants";
import { NavigationConfigDto } from "@domain/dtos";
import { CodePreview, ComponentNav, Content, Markdown } from "@views/shared";

@Component({
    selector: "ai-component",
    imports: [Content, CodePreview, ScrollDirective, ScrollItemDirective, Markdown, ComponentNav],
    templateUrl: "./component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiComponent {
    #activatedRoute = inject(ActivatedRoute);
    #router = inject(Router);
    #title = inject(Title);

    activeSummary?: string;

    private params = toSignal(this.#activatedRoute.params);

    dataComponent = computed<ComponentData | null>(() => {
        const componentName = this.params()?.["componentName"] as string | undefined;
        if (!componentName) return null;
        return components.find(item => item.componentName === componentName) ?? null;
    });

    navigations = computed<NavigationConfigDto>(() => {
        const comp = this.dataComponent();
        return {
            items: [
                { id: "overview", label: "Nesta página", type: "core" },
                { id: "installation", label: "Instalação", type: "core" },
                {
                    id: "examples",
                    label: "Exemplos",
                    type: "core",
                    children: comp?.examples.map(e => ({ id: e.name, label: e.name, type: "custom" })) ?? [],
                },
                { id: "api", label: "API", type: "core" },
            ],
        };
    });

    constructor() {
        effect(() => {
            const componentName = this.dataComponent()?.componentName;
            if (!componentName) {
                this.#router.navigateByUrl("/");
                return;
            }
            const capitalized = componentName[0].toUpperCase() + componentName.slice(1);
            this.#title.setTitle(`AI • ${capitalized}`);
        });
    }
}
