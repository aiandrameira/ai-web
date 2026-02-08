```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";
import { AiButton } from "../button";

@Component({
    imports: [AiButton],
    template: `
        <div class="flex flex-col gap-y-4">
            <h2 class="text-primary font-semibold text-base">default</h2>
            <div class="flex items-center gap-x-2">
                <ai-button fill="default" variant="primary">primary</ai-button>
                <ai-button fill="default" variant="accent">accent</ai-button>
                <ai-button fill="default" variant="destructive">destructive</ai-button>
            </div>

            <h2 class="text-primary font-semibold text-base">line</h2>
            <div class="flex items-center gap-x-2">
                <ai-button fill="line" variant="primary">primary</ai-button>
                <ai-button fill="line" variant="accent">accent</ai-button>
                <ai-button fill="line" variant="destructive">destructive</ai-button>
            </div>
        </div>
    `,
})
export class DemoButtonFillComponent {}
```
