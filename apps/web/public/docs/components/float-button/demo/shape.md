```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";
import { AiFloatButton } from "../float-button";

@Component({
    imports: [AiFloatButton],
    template: `
        <div class="flex items-center gap-x-4">
            <ai-float-button variant="primary" shape="default" icon="stack" />
            <ai-float-button variant="primary" shape="circle" icon="stack" />
        </div>
    `,
})
export class DemoFloatButtonShapeComponent {}
```
