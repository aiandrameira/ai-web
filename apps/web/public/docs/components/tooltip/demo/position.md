```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";
import { AiButton } from "../../button";
import { AiTooltipImports } from "../tooltip.imports";

@Component({
    imports: [AiButton, AiTooltipImports],
    template: `
        <div class="flex items-center flex-col gap-y-4">
            <ai-button type="button" aiTooltip="Tooltip content" aiPosition="top"> Top </ai-button>

            <div class="flex items-center gap-x-2">
                <ai-button type="button" aiTooltip="Tooltip content" aiPosition="left"> Left </ai-button>
                <ai-button type="button" aiTooltip="Tooltip content" aiPosition="right"> Right </ai-button>
            </div>

            <ai-button type="button" aiTooltip="Tooltip content" aiPosition="bottom"> Bottom </ai-button>
        </div>
    `,
})
export class DemoTooltipPositionComponent {}
```
