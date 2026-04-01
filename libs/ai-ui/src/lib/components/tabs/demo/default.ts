import { Component } from "@angular/core";

import { AiTab, AiTabsGroup } from "../tabs";

@Component({
    imports: [AiTabsGroup, AiTab],
    template: `
        <ai-tabs-group>
            <ai-tab label="Tab 1">Content 1</ai-tab>
            <ai-tab label="Tab 2">Content 2</ai-tab>
            <ai-tab label="Tab 3">Content 3</ai-tab>
        </ai-tabs-group>
    `,
})
export class DemoTabsDefaultComponent {}
