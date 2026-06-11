import { Component } from "@angular/core";

import { AiButton } from "../../button";
import { AiTooltipImports } from "../tooltip.imports";

@Component({
    selector: "ai-demo-tooltip-click",
    imports: [AiButton, AiTooltipImports],
    template: `
        <div class="flex items-center justify-center">
            <ai-button type="button" aiTooltip="Tooltip content" aiTrigger="click"> Click me </ai-button>
        </div>
    `,
})
export class DemoTooltipClickComponent {}
