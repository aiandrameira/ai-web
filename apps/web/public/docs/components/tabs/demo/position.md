```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";

import { AiButton } from "../../button";
import { AiTab, AiTabsGroup } from "../tabs";
import { TabActivePosition, TabPosition } from "../tabs.variants";

@Component({
    imports: [AiTabsGroup, AiTab, AiButton],
    template: `
        <div class="flex flex-col gap-6 w-full">
            <ai-tabs-group [tabsPosition]="tabsPosition" [activePosition]="activePosition" class="h-50">
                <ai-tab label="Tab 1">Content 1</ai-tab>
                <ai-tab label="Tab 2">Content 2</ai-tab>
                <ai-tab label="Tab 3">Content 3</ai-tab>
            </ai-tabs-group>

            <div class="flex flex-col gap-y-3 text-sm">
                <div class="flex items-center gap-2">
                    <span class="font-medium">Tabs Position:</span>
                    @for (pos of positions; track pos) {
                        <button ai-button variant="ghost" size="sm" (click)="tabsPosition = pos">{{ pos }}</button>
                    }
                </div>
                <div class="flex items-center gap-2">
                    <span class="font-medium">Active Indicator:</span>
                    @for (pos of positions; track pos) {
                        <button ai-button variant="ghost" size="sm" (click)="activePosition = pos">{{ pos }}</button>
                    }
                </div>
            </div>
        </div>
    `,
})
export class DemoTabsPositionComponent {
    positions: TabPosition[] = ["top", "bottom", "left", "right"];
    tabsPosition: TabPosition = "top";
    activePosition: TabActivePosition = "bottom";
}
```
