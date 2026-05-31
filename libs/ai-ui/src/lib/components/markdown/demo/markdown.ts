import { DemoMarkdownEditorComponent } from "./editor";
import { DemoMarkdownViewerComponent } from "./viewer";

export const MARKDOWN = {
    componentName: "markdown",
    componentType: "markdown",
    examples: [
        { name: "editor", component: DemoMarkdownEditorComponent },
        { name: "viewer", component: DemoMarkdownViewerComponent },
    ],
};
