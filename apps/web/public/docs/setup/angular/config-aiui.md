```angular-ts title="app.ts" showLineNumbers copyButton
import { AiBadge, AiButton, AiIcon } from "@aiandrameira/ai-ui";
import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    imports: [AiButton, AiBadge, AiIcon],
    template: `
        <div class="flex flex-col gap-y-4 w-full max-w-xl py-24 px-4 mx-auto">
            <h1 class="text-4xl font-bold text-center text-violet-600">Hello World</h1>
            <div class="flex items-center gap-x-2">
                <ai-button>Button</ai-button>
                <ai-badge>Badge</ai-badge>
                <ai-icon icon="heart" size="xl" />
            </div>
        </div>
    `,
})
export class App {}
```
