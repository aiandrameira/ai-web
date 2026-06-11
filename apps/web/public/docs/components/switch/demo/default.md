```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";

import { AiSwitch } from "../switch";

@Component({
    selector: "ai-demo-switch-default",
    imports: [AiSwitch],
    template: `
        <div class="flex flex-col gap-4">
            <ai-switch variant="primary">Switch primary</ai-switch>
            <ai-switch variant="accent">Switch accent</ai-switch>
            <ai-switch variant="destructive">Switch destructive</ai-switch>
        </div>
    `,
})
export class DemoSwitchDefaultComponent {}
```
