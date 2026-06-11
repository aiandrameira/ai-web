```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";

import { AiFloatButton } from "../float-button";

@Component({
    selector: "ai-demo-float-button-variant",
    imports: [AiFloatButton],
    template: `
        <div class="flex items-center gap-x-4">
            <ai-float-button variant="default" icon="stack" />
            <ai-float-button variant="primary" icon="stack" />
            <ai-float-button variant="accent" icon="stack" />
        </div>
    `,
})
export class DemoFloatButtonVariantComponent {}
```
