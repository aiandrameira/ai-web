import { Component } from "@angular/core";

import { AiSwitch } from "../switch";

@Component({
    imports: [AiSwitch],
    template: `
        <div class="flex flex-col gap-4">
            <ai-switch size="sm" variant="primary">Switch small</ai-switch>
            <ai-switch size="normal" variant="primary">Switch normal</ai-switch>
            <ai-switch size="lg" variant="primary">Switch large</ai-switch>
        </div>
    `,
})
export class DemoSwitchSizeComponent {}
