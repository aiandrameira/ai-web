import { AiBadge, AiButton, AiCard } from "@ai-ui/components";
import { ThemeStore } from "@ai-ui/infra";
import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { ScrollDirective, ScrollItemDirective } from "@core/directives";
import { NavigationConfigDto } from "@domain/dtos";
import { Content, Heading, Markdown } from "@views/shared";

@Component({
    selector: "ai-dark-mode",
    imports: [Heading, Content, ScrollDirective, ScrollItemDirective, Markdown, AiCard, AiButton, AiBadge],
    templateUrl: "./dark-mode.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DarkMode {
    #themeStore = inject(ThemeStore);

    theme = this.#themeStore.theme;

    onChangeTheme() {
        const currentTheme = this.#themeStore.theme();
        this.#themeStore.changeTo(currentTheme === "light" ? "dark" : "light");
    }

    activeSummary?: string;

    navigations = signal<NavigationConfigDto>({
        items: [
            { id: "overview", label: "Nesta página", type: "core" },
            { id: "implementation", label: "Implementação", type: "core" },
            { id: "usage-in-application", label: "Uso na aplicação", type: "core" },
            { id: "interaction", label: "Interação", type: "core" },
        ],
    });
}
