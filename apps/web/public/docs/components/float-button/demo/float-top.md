```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";
import { AiFloatButtonTop } from "../float-button-top";

@Component({
    imports: [AiFloatButtonTop],
    template: `
        <div class="flex items-center gap-x-4">
            <ai-float-button-top variant="primary" shape="default" icon="arrow-up" />
        </div>
    `,
})
export class DemoFloatButtonTopComponent {}
```
