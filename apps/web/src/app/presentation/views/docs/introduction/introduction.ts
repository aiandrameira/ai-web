import { AiButton, AiCard, AiIcon, AiIconType, AiSeparator } from "@ai-ui/components";
import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { ScrollDirective } from "@core/directives";
import { NavigationConfigDto } from "@domain/dtos";
import { Content, Heading } from "@views/shared";

@Component({
    selector: "ai-introduction",
    imports: [Heading, Content, ScrollDirective, AiCard, AiIcon, AiSeparator, AiButton],
    templateUrl: "./introduction.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Introduction {
    activeSummary?: string;

    navigations = signal<NavigationConfigDto>({
        items: [
            { id: "overview", label: "Overview", type: "core" },
            { id: "why-aiui", label: "Porque AiUI", type: "core" },
            { id: "ai-ready", label: "Pronto para IA", type: "core" },
            { id: "open-source", label: "Código aberto", type: "core" },
            { id: "support", label: "Suporte", type: "core" },
        ],
    });

    cardWhyAiUI = signal([
        {
            icon: "space-ship-2" as AiIconType,
            title: "Bonito e prático",
            description: "Componentes com visual deslumbrante e prontos para uso, mas que permanecem funcionais e acessíveis.",
        },
        {
            icon: "group-2" as AiIconType,
            title: "Soluções reais",
            description: "Feita por desenvolvedores para desenvolvedores, oferecendo soluções para problemas que enfrentamos no dia a dia.",
        },
        {
            icon: "angularjs" as AiIconType,
            title: "Angular moderno",
            description: "Construída com os recursos mais recentes do Angular, como Standalone Components e Signals, seguindo as melhores práticas da plataforma.",
        },
        {
            icon: "palette" as AiIconType,
            title: "Personalizável",
            description: "Integrada com Tailwind CSS, permitindo total flexibilidade para adaptar cada componente ao seu sistema de design.",
        },
    ]);

    cardOpenSource = signal([
        {
            icon: "checkbox-circle" as AiIconType,
            title: "Para comunidade",
            description: "Criada por desenvolvedores, para desenvolvedores. O AiUI é um projeto de código aberto, 100% gratuito.",
        },
        {
            icon: "github" as AiIconType,
            title: "Código aberto",
            description: "Disponível no GitHub, onde você pode explorar o código, relatar problemas ou contribuir com melhorias.",
        },
        {
            icon: "heart" as AiIconType,
            title: "Feita com amor",
            description: "Cada componente é desenvolvido com cuidado e atenção aos detalhes, garantindo uma experiência de qualidade para os usuários.",
        },
    ]);

    cardProhibited = signal([
        {
            title: "Controle corporativo",
            description: "Nenhuma entidade jamais possuirá ou controlará o AiUI.",
        },
        {
            title: "Dependência",
            description: "Seu código é seu, leve-o para onde precisar.",
        },
        {
            title: "Pagamento",
            description: "Sem barreiras de pagamento.",
        },
    ]);
}
