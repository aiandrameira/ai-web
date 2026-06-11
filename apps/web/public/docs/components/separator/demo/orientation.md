```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";

import { AiSeparator } from "../separator";

@Component({
    selector: "ai-demo-separator-orientation",
    imports: [AiSeparator],
    template: `
        <div class="flex flex-col gap-4">
            <div class="space-y-1">
                <h4 class="text-sm font-medium leading-none">Radix Primitives</h4>
                <p class="text-muted-foreground text-sm">An open-source UI component library.</p>
            </div>
            <ai-separator orientation="horizontal" />
            <div class="flex h-5 items-center space-x-4 text-sm">
                <div>Blog</div>
                <ai-separator orientation="vertical" />
                <div>Docs</div>
                <ai-separator orientation="vertical" />
                <div>Source</div>
            </div>
        </div>
    `,
})
export class DemoSeparatorOrientationComponent {}
```
