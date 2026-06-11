```angular-ts showLineNumbers copyButton
import { Component, inject } from "@angular/core";

import { ThemeStore } from "../../../infra";
import { AiMarkdown } from "../markdown";

@Component({
    selector: "ai-demo-markdown-viewer",
    imports: [AiMarkdown],
    template: `
        <div class="flex flex-col gap-y-4 w-full max-w-xs sm:max-w-sm md:max-w-2xl">
            <ai-markdown mode="viewer" [code]="code" [theme]="theme()" language="typescript" class="w-full md:w-112.5" />
        </div>
    `,
})
export class DemoMarkdownViewerComponent {
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
```
