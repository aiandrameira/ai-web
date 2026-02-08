import { Component } from "@angular/core";

import { AiCheckbox } from "../checkbox";

@Component({
    imports: [AiCheckbox],
    template: `
        <div class="flex flex-col gap-y-4">
            <ai-checkbox size="default">Checkbox padrão</ai-checkbox>
            <ai-checkbox size="lg">Checkbox large</ai-checkbox>
        </div>
    `,
})
export class DemoCheckboxSizeComponent {}
