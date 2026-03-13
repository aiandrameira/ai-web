import { AiAvatar, AiCard, AiIcon, AiTooltipModule } from "@ai-ui/components";
import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { ScrollDirective, ScrollItemDirective } from "@core/directives";
import { NavigationConfigDto } from "@domain/dtos";
import { GithubService } from "@infra/services";
import { Content, Heading } from "@views/shared";

interface iCredit {
    title: string;
    description: string;
    img?: string;
    url: string;
}

@Component({
    selector: "ai-about",
    imports: [Heading, Content, ScrollDirective, ScrollItemDirective, AiCard, AiTooltipModule, AiAvatar, AiIcon],
    templateUrl: "./about.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
    #githubService = inject(GithubService);
    activeSummary?: string;

    navigations = signal<NavigationConfigDto>({
        items: [
            { id: "overview", label: "Nesta página", type: "core" },
            { id: "founders", label: "Fundadores", type: "core" },
            { id: "contributors", label: "Contribuidores", type: "core" },
            { id: "credits", label: "Créditos", type: "core" },
        ],
    });

    startsCount = this.#githubService.startsCount;
    contributors = this.#githubService.contributors;

    credits = signal<iCredit[]>([
        {
            title: "shadcn/ui",
            description: "The design philosophy and component patterns that inspired ZardUI's architecture and aesthetic.",
            img: "https://avatars.githubusercontent.com/u/139895814?s=48&v=4",
            url: "https://ui.shadcn.com/",
        },
        {
            title: "zardui",
            description: "A collection of beautiful and accessible components for Angular based in Shadcn/ui and Ng-zorro. Fully open source and free",
            img: "https://avatars.githubusercontent.com/u/189820189?s=48&v=4",
            url: "https://zardui.com/",
        },
        {
            title: "spartan/ui",
            description: "Cutting-edge tools powering Angular full-stack development.",
            url: "https://spartan.ng/",
            img: "https://avatars.githubusercontent.com/u/187548515?s=48&v=4",
        },
        {
            title: "Tailwind CSS",
            description: "A utility-first CSS framework for rapid UI development.",
            url: "https://tailwindcss.com/",
            img: "https://avatars.githubusercontent.com/u/67109815?s=48&v=4",
        },
        { title: "Angular", description: "Deliver web apps with confidence", url: "https://angular.io/", img: "https://avatars.githubusercontent.com/u/139426?s=48&v=4" },
    ]);
}
