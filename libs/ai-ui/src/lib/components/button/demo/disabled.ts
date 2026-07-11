import { Component } from "@angular/core";

import { AiTooltipDirective } from "../../tooltip";
import { AiButton } from "../button";

@Component({
    imports: [AiButton, AiTooltipDirective],
    template: `
        <div class="flex items-center justify-center gap-x-2">
            <ai-button disabled>disabled</ai-button>
            <ai-button disabled aiTooltip="This is a disabled button">disabled with tooltip</ai-button>
        </div>
    `,
})
export class DemoButtonDisabledComponent {}
