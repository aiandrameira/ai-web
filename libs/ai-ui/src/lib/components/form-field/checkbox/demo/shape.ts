import { Component } from "@angular/core";

import { AiCheckbox } from "../checkbox";

@Component({
    imports: [AiCheckbox],
    template: `
        <div class="flex items-center justify-center gap-x-4 w-full max-w-sm">
            <ai-checkbox shape="default" [checked]="true">Default</ai-checkbox>
            <ai-checkbox shape="circle" [checked]="true">Circle</ai-checkbox>
        </div>
    `,
})
export class DemoCheckboxShapeComponent {}
