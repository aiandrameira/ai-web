import { Component } from "@angular/core";

import { AiCheckbox } from "../checkbox";

@Component({
    imports: [AiCheckbox],
    template: `
        <div class="flex flex-col gap-y-4">
            <ai-checkbox variant="primary">Checkbox primary</ai-checkbox>
            <ai-checkbox variant="accent">Checkbox accent</ai-checkbox>
            <ai-checkbox variant="destructive">Checkbox destructive</ai-checkbox>
        </div>
    `,
})
export class DemoCheckboxDefaultComponent {}
