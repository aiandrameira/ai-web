```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";

import { AiSwitch } from "../switch";

@Component({
    imports: [AiSwitch],
    template: `
        <div class="flex items-center gap-4">
            <ai-switch [disabled]="true">Disabled</ai-switch>
            <ai-switch [disabled]="true" [checked]="true">Disabled checked</ai-switch>
        </div>
    `,
})
export class DemoSwitchDisabledComponent {}
```
