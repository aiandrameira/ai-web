import { Component } from "@angular/core";

import { AiButton } from "../../button";
import { AiPopoverImports } from "../popover.imports";

@Component({
    selector: "ai-demo-popover-position",
    imports: [AiPopoverImports, AiButton],
    template: `
        <div class="flex flex-col gap-2">
            <button ai-button variant="ghost" aiPopover position="top" [content]="popoverContent">Top</button>

            <div class="flex items-center gap-2">
                <button ai-button variant="ghost" aiPopover position="left" [content]="popoverContent">Left</button>
                <button ai-button variant="ghost" aiPopover position="right" [content]="popoverContent">Right</button>
            </div>

            <button ai-button variant="ghost" aiPopover position="bottom" [content]="popoverContent">Bottom</button>
        </div>

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
export class DemoPopoverPositionComponent {}
