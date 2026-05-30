```angular-ts showLineNumbers copyButton
import { Component, signal } from "@angular/core";

import { AiButton } from "../../button";
import { AiTab, AiTabsGroup } from "../tabs";

@Component({
    imports: [AiTabsGroup, AiTab, AiButton],
    template: `
        <div class="flex flex-col gap-6 w-full max-w-xl">
            <button ai-button variant="ghost" size="sm" (click)="arrows.set(!arrows())">{{ arrows() ? "Hide" : "Show" }} Arrows</button>

            <ai-tabs-group [showArrows]="arrows()">
                <ai-tab label="Tab 1">Content 1</ai-tab>
                <ai-tab label="Tab 2">Content 2</ai-tab>
                <ai-tab label="Tab 3">Content 3</ai-tab>
                <ai-tab label="Tab 4">Content 4</ai-tab>
                <ai-tab label="Tab 5">Content 5</ai-tab>
                <ai-tab label="Tab 6">Content 6</ai-tab>
            </ai-tabs-group>
        </div>
    `,
})
export class DemoTabsArrowsComponent {
    arrows = signal(true);
}
```
