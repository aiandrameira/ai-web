```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";

import { AiCheckbox } from "../checkbox";

@Component({
    imports: [AiCheckbox],
    template: `
        <div class="flex items-center justify-center gap-x-4 w-full max-w-sm">
            <ai-checkbox size="default">Default</ai-checkbox>
            <ai-checkbox size="lg" [checked]="true">Large</ai-checkbox>
        </div>
    `,
})
export class DemoCheckboxSizeComponent {}
```
