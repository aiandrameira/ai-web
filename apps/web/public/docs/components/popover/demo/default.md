```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";

import { AiButton } from "../../button";
import { AiPopoverImports } from "../popover.imports";

@Component({
    selector: "ai-demo-popover-default",
    imports: [AiPopoverImports, AiButton],
    template: `
        <button ai-button variant="ghost" aiPopover [content]="popoverContent">Abrir popover</button>

        <ng-template #popoverContent>
            <ai-popover>
                <div class="space-y-2">
                    <h4 class="font-medium font-title text-primary leading-none">Dimensions</h4>
                    <p class="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
                </div>
            </ai-popover>
        </ng-template>
    `,
})
export class DemoPopoverDefaultComponent {}
```
