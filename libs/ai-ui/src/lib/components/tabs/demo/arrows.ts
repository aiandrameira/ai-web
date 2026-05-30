import { Component, signal } from "@angular/core";

import { AiButton } from "../../button";
import { AiTab, AiTabsGroup } from "../tabs";

@Component({
    imports: [AiTabsGroup, AiTab, AiButton],
    template: `
        <div class="flex flex-col gap-6 w-full max-w-xl">
            <button ai-button variant="ghost" size="sm" (click)="arrows.set(!arrows())">{{ arrows() ? "Hide" : "Show" }} Arrows</button>

            <ai-tabs-group [showArrows]="arrows()">
                @for (item of tabs(); track $index) {
                    <ai-tab [label]="item.label">{{ item.content }}</ai-tab>
                }
            </ai-tabs-group>
        </div>
    `,
})
export class DemoTabsArrowsComponent {
    arrows = signal(true);

    tabs = signal([
        { label: "Tab 1", content: "Content 1" },
        { label: "Tab 2", content: "Content 2" },
        { label: "Tab 3", content: "Content 3" },
        { label: "Tab 4", content: "Content 4" },
        { label: "Tab 5", content: "Content 5" },
        { label: "Tab 6", content: "Content 6" },
    ]);
}
