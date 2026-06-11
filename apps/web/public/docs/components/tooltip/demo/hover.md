```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";

import { AiButton } from "../../button";
import { AiTooltipImports } from "../tooltip.imports";

@Component({
    selector: "ai-demo-tooltip-hover",
    imports: [AiButton, AiTooltipImports],
    template: `
        <div class="flex items-center justify-center">
            <ai-button type="button" aiTooltip="Tooltip content"> Hover me </ai-button>
        </div>
    `,
})
export class DemoTooltipHoverComponent {}
```
