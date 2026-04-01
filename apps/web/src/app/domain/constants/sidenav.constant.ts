interface IData {
    name: string;
    path: string;
    available?: boolean;
}

interface IComponent {
    title: string;
    data: IData[];
}

export const docsPath: IComponent = {
    title: "Começando",
    data: [
        { name: "Introdução", path: "/docs/introduction", available: true },
        { name: "Instalação", path: "/docs/installation", available: true },
        { name: "Tema", path: "/docs/theming", available: true },
        { name: "Modo escuro", path: "/docs/dark-mode", available: true },
        { name: "Suporte a versões", path: "/docs/support", available: true },
        { name: "Sobre AiUI", path: "/docs/about", available: true },
    ],
};

export const formPaths: IComponent = {
    title: "Formulário",
    data: [
        { name: "Autocomplete", path: "/component/autocomplete", available: true },
        { name: "Checkbox", path: "/component/checkbox", available: true },
        { name: "Input", path: "/component/input", available: true },
        { name: "Radio", path: "/component/radio", available: true },
        { name: "Segmented", path: "/component/segmented", available: true },
        { name: "Select", path: "/component/select", available: true },
        { name: "Switch", path: "/component/switch", available: true },
        { name: "Textarea", path: "/component/textarea", available: true },
    ].sort((a, b) => a.name.localeCompare(b.name)),
};

export const componentsPath: IComponent = {
    title: "Componentes",
    data: [
        { name: "Alert", path: "/component/alert", available: true },
        { name: "Alert Dialog", path: "/component/alert-dialog", available: true },
        { name: "Avatar", path: "/component/avatar", available: true },
        { name: "Badge", path: "/component/badge", available: true },
        { name: "Breadcrumb", path: "/component/breadcrumb", available: true },
        { name: "Button", path: "/component/button", available: true },
        { name: "Button Toggle", path: "/component/button-toggle", available: true },
        { name: "Card", path: "/component/card", available: true },
        { name: "Command", path: "/component/command", available: true },
        { name: "Dialog", path: "/component/dialog", available: true },
        { name: "Empty", path: "/component/empty", available: true },
        { name: "Icon", path: "/component/icon", available: true },
        { name: "Float Button", path: "/component/float-button", available: true },
        { name: "Loader", path: "/component/loader", available: true },
        { name: "Markdown", path: "/component/markdown", available: true },
        { name: "Pagination", path: "/component/pagination", available: true },
        { name: "Separator", path: "/component/separator", available: true },
        { name: "Table", path: "/component/table", available: true },
        { name: "Toast", path: "/component/toast", available: true },
        { name: "Tooltip", path: "/component/tooltip", available: true },
    ].sort((a, b) => a.name.localeCompare(b.name)),
};

export const sidenavPaths = [docsPath, formPaths, componentsPath];
