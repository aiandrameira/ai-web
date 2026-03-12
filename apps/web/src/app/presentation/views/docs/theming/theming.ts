import { AiCard } from "@ai-ui/components";
import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { ScrollDirective, ScrollItemDirective } from "@core/directives";
import { NavigationConfigDto } from "@domain/dtos";
import { Content, Heading, Markdown } from "@views/shared";

@Component({
    selector: "api-theming",
    imports: [Heading, Content, ScrollDirective, ScrollItemDirective, Markdown, AiCard],
    templateUrl: "./theming.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Theming {
    activeSummary?: string;

    navigations = signal<NavigationConfigDto>({
        items: [
            { id: "overview", label: "Nesta página", type: "core" },
            { id: "css-variables", label: "Variáveis CSS", type: "core" },
            { id: "utility-classes", label: "Classes utilitárias", type: "core" },
            { id: "conventions", label: "Convenções", type: "core" },
            { id: "add-new-colors", label: "Adicionar novas cores", type: "core" },
            { id: "other-format", label: "Outros formatos", type: "core" },
        ],
    });
}
