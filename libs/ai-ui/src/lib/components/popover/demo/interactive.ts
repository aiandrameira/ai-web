import { Component, viewChild } from "@angular/core";

import { AiButton } from "../../button";
import { AiPopoverDirective } from "../popover.directive";
import { AiPopoverImports } from "../popover.imports";

@Component({
    selector: "ai-demo-popover-interactive",
    imports: [AiButton, AiPopoverImports],
    template: `
        <button ai-button variant="ghost" aiPopover [content]="interactiveContent" #popoverTrigger>Abrir popover</button>

        <ng-template #interactiveContent>
            <ai-popover>
                <div class="flex flex-col gap-4">
                    <div class="space-y-2 mb-2">
                        <h4 class="font-medium font-title text-primary leading-none">Settings</h4>
                        <p class="text-sm text-muted-foreground">Manage your account settings.</p>
                    </div>

                    <button ai-button full (click)="onSave()">Confirmar</button>
                </div>
            </ai-popover>
        </ng-template>
    `,
})
export class DemoPopoverInteractiveComponent {
    popoverDirective = viewChild.required("popoverTrigger", { read: AiPopoverDirective });

    onSave() {
        console.log("Settings saved");
        this.popoverDirective().hide();
    }
}
