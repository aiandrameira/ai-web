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
            path: "/docs/setup/angular/install-angular.md",
            lineNumber: false,
        },
    },
    {
        title: "Instalar AiUI",
        subtitle: "Instale o AiUI usando o npm.",
        file: {
            path: "/docs/setup/angular/install-aiui.md",
            lineNumber: false,
        },
    },
    {
        title: "Configurando o estilo",
        subtitle:
            "Adicione as configurações de estilo necessárias para o AiUI funcionar corretamente. Isso inclui a importação dos estilos do AiUI e a configuração do Tailwind para garantir que os estilos sejam aplicados corretamente.",
        file: {
            path: "/docs/setup/angular/config-style.md",
            lineNumber: false,
        },
    },
    {
        title: "Adicionando dependências de ícones e fontes",
        subtitle:
            "Para utilizar os ícones do AiUI e as fontes personalizadas, é necessário adicionar as dependências do Remix Icon e do Google Fonts no arquivo index.html do projeto.",
        file: {
            path: "/docs/setup/angular/config-icon.md",
            lineNumber: false,
        },
    },
    {
        title: "Testar a instalação",
        subtitle: "Verifique se o AiUI está funcionando corretamente no seu projeto Angular.",
        file: {
            path: "/docs/setup/angular/config-aiui.md",
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
