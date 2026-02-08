```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";
import { AiButton } from "../button";

@Component({
    imports: [AiButton],
    template: `
        <div class="flex items-center gap-x-2">
            <ai-button variant="primary">primary</ai-button>
            <ai-button variant="accent">accent</ai-button>
            <ai-button variant="ghost">ghost</ai-button>
            <ai-button variant="link">link</ai-button>
            <ai-button variant="outline">outline</ai-button>
            <ai-button variant="destructive">destructive</ai-button>
            <ai-button variant="default">default</ai-button>
        </div>
    `,
})
export class DemoButtonVariantComponent {}
```
