import { TitleCasePipe } from "@angular/common";
import { Component, signal } from "@angular/core";

import { AiButton } from "../../button";
import { AiTab, AiTabsGroup } from "../tabs";
import { TabAlign } from "../tabs.variants";

@Component({
    imports: [AiTabsGroup, AiTab, AiButton, TitleCasePipe],
    template: `
        <div class="flex flex-col gap-6 w-full">
            <ai-tabs-group [alignTabs]="align()">
                <ai-tab label="Tab 1">Content 1</ai-tab>
                <ai-tab label="Tab 2">Content 2</ai-tab>
                <ai-tab label="Tab 3">Content 3</ai-tab>
            </ai-tabs-group>

            <div class="flex items-center gap-2">
                <span class="text-sm text-muted-foreground">AlignTabs: {{ align() }}</span>
            </div>

            <div class="flex items-center gap-2">
                @for (a of aligns; track a) {
                    <button ai-button variant="ghost" size="sm" (click)="align.set(a)">{{ a | titlecase }}</button>
                }
            </div>
        </div>
    `,
})
export class DemoTabsAlignComponent {
    aligns: TabAlign[] = ["start", "center", "end"];
    align = signal<TabAlign>("start");
}
