import { Component } from "@angular/core";
import { AiMarkdown } from "../markdown";

@Component({
    imports: [AiMarkdown],
    template: `
        <div class="flex flex-col gap-y-4 max-w-md w-full">
            <ai-markdown mode="editor" [code]="code" language="typescript" />
        </div>
    `,
})
export class DemoMarkdownEditorComponent {
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
