```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";

import { AiSwitch } from "../switch";

@Component({
    selector: "ai-demo-switch-size",
    imports: [AiSwitch],
    template: `
        <div class="flex flex-col gap-4">
            <ai-switch size="sm" variant="primary">Switch small</ai-switch>
            <ai-switch size="default" variant="primary">Switch default</ai-switch>
            <ai-switch size="lg" variant="primary">Switch large</ai-switch>
        </div>
    `,
})
export class DemoSwitchSizeComponent {}
```
