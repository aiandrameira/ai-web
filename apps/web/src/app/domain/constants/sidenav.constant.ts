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
        { name: "Instalação", path: "/docs/installation", available: false },
        { name: "Tema", path: "/docs/theming", available: false },
        { name: "CLI", path: "/cli/installation", available: true },
    ],
};

export const formPaths: IComponent = {
    title: "Formulário",
    data: [
        { name: "Input", path: "/component/input", available: false },
        { name: "Select", path: "/component/select", available: false },
    ].sort((a, b) => a.name.localeCompare(b.name)),
};

export const componentsPath: IComponent = {
    title: "Componentes",
    data: [
        // { name: "Accordion", path: "/component/accordion", available: true },
        { name: "Alert", path: "/component/alert", available: false },
        { name: "Alert Dialog", path: "/component/alert-dialog", available: false },
        // { name: "Autocomplete", path: "/component/autocomplete", available: true },
        { name: "Avatar", path: "/component/avatar", available: true },
        { name: "Badge", path: "/component/badge", available: true },
        { name: "Breadcrumb", path: "/component/breadcrumb", available: false },
        { name: "Button", path: "/component/button", available: true },
        { name: "Card", path: "/component/card", available: false },
        { name: "Command", path: "/component/command", available: false },
        { name: "Dialog", path: "/component/dialog", available: false },
        { name: "Empty", path: "/component/empty", available: true },
        { name: "Icon", path: "/component/icon", available: true },
        // { name: "Carousel", path: "/component/carousel", available: true },
        // { name: "Checkbox", path: "/component/checkbox", available: true },
        // { name: "Chips", path: "/component/chips", available: true },
        // { name: "Data Table", path: "/component/data-table", available: true },
        // { name: "Drawer", path: "/component/drawer", available: true },
        { name: "Float Button", path: "/component/float-button", available: false },
        // { name: "Datetime", path: "/component/datetime", available: true },
        { name: "Loader", path: "/component/loader", available: false },
        { name: "Markdown", path: "/component/markdown", available: false },
        // { name: "Menu", path: "/component/menu", available: true },
        // { name: "MiniWindow", path: "/component/mini-window", available: true },
        // { name: "Modal", path: "/component/modal", available: true },
        // { name: "Separator", path: "/component/separator", available: true },
        // { name: "Radio", path: "/component/radio", available: true },
        // { name: "Segmented", path: "/component/segmented", available: true },
        { name: "Separator", path: "/component/separator", available: true },
        // { name: "Skeleton", path: "/component/skeleton", available: true },
        // { name: "Stepper", path: "/component/stepper", available: true },
        // { name: "Switch", path: "/component/switch", available: true },
        // { name: "Popover", path: "/component/popover", available: true },
        // { name: "Progress-bar", path: "/component/progress-bar", available: true },
        // { name: "Textarea", path: "/component/textarea", available: true },
        // { name: "Upload", path: "/component/upload", available: true },
        // { name: "Tabs", path: "/component/tabs", available: true },
        { name: "Toast", path: "/component/toast", available: true },
        { name: "Tooltip", path: "/component/tooltip", available: false },
    ].sort((a, b) => a.name.localeCompare(b.name)),
};

export const sidenavPaths = [docsPath, formPaths, componentsPath];
