```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";
import { AiButton } from "../button";

@Component({
    imports: [AiButton],
    template: `
        <div class="flex items-center justify-center gap-x-2">
            <ai-button size="lg">large</ai-button>
            <ai-button size="default">default</ai-button>
            <ai-button size="sm">small</ai-button>
            <ai-button size="xs" icon="heart" />
        </div>
    `,
})
export class DemoButtonSizeComponent {}
```
