import { Component, inject } from "@angular/core";

import { ThemeStore } from "../../../infra";
import { AiMarkdown } from "../markdown";

@Component({
    selector: "ai-demo-markdown-editor",
    imports: [AiMarkdown],
    template: `
        <div class="flex flex-col gap-y-4 max-w-xs sm:max-w-sm md:max-w-md w-full">
            <ai-markdown mode="editor" [code]="code" [theme]="theme()" language="typescript" />
        </div>
    `,
})
export class DemoMarkdownEditorComponent {
    protected theme = inject(ThemeStore).theme;

    code = `export function makeTest () {
    return {
        message: "success",
        data: {
            id: 1,
            name: "Test User"
        }
    }
}`;
}
