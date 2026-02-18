import { InstallDto, StepDto } from "@domain/dtos";

export const stepsAngular: StepDto[] = [
    {
        title: "Criar projeto",
        subtitle: "Inicie a CLI e crie um projeto Angular que utilize Tailwind como estilo padrão.",
        url: {
            text: "Como o Tailwind é o núcleo do projeto, não recomendamos o uso de outros pré-processadores.",
            href: "/docs/scss",
            external: false,
        },
        file: {
            path: "/docs/setup/install-angular.md",
            lineNumber: false,
        },
    },
    {
        title: "Instalar AiUI",
        subtitle: "Instale o AiUI usando o npm.",
        file: {
            path: "/docs/setup/install-aiui.md",
            lineNumber: false,
        },
    },
    {
        title: "Adicionando dependências",
        subtitle: "Instale as dependências necessárias para o projeto.",
        file: {
            path: "/docs/setup/config-aiui.md",
            lineNumber: false,
        },
    },
    {
        title: "Configurando o estilo",
        subtitle: "Configure o estilo do projeto utilizando Tailwind.",
        file: {
            path: "/docs/setup/config-style.md",
            lineNumber: false,
        },
    },
];

export const installations: InstallDto[] = [
    {
        env: "angular",
        title: "Angular",
        description: "Instalação e configuração do AiUI para projetos Angular.",
        steps: stepsAngular,
    },
];
