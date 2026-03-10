```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";
import { AiButton } from "../button";

@Component({
    imports: [AiButton],
    template: `
        <div class="flex items-center justify-center">
            <ai-button disabled>disabled</ai-button>
        </div>
    `,
})
export class DemoButtonDisabledComponent {}
```
