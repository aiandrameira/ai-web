import { Component } from "@angular/core";
import { AiButton } from "../../button";
import { AiTooltipImports } from "../tooltip.imports";

@Component({
    imports: [AiButton, AiTooltipImports],
    template: `
        <div class="flex flex-col gap-y-4 w-25">
            <ai-button type="button" aiTooltip="Tooltip content" (show)="onShow()" (hide)="onHide()"> Events </ai-button>

            <span class="text-sm">Event: {{ event }}</span>
        </div>
    `,
})
export class DemoTooltipEventsComponent {
    protected event = "none";

    protected onShow() {
        this.event = "(show)";
    }

    protected onHide() {
        this.event = "(hide)";
    }
}
