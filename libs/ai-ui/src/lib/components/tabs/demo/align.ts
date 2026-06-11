import { TitleCasePipe } from "@angular/common";
import { Component, signal } from "@angular/core";

import { AiButton } from "../../button";
import { AiTabsImports } from "../tabs.imports";
import { TabAlign } from "../tabs.variants";

@Component({
    selector: "ai-demo-tabs-align",
    imports: [AiTabsImports, AiButton, TitleCasePipe],
    template: `
        <div class="flex flex-col gap-6 w-full max-w-xs sm:max-w-sm md:max-w-xl">
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
