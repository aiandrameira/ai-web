import { Component } from "@angular/core";
import { AiMarkdown } from "../markdown";

@Component({
    imports: [AiMarkdown],
    template: `
        <div class="flex flex-col gap-y-4 w-full max-w-2xl">
            <ai-markdown mode="viewer" [code]="code" language="typescript" class="w-112.5" />
        </div>
    `,
})
export class DemoMarkdownViewerComponent {
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
