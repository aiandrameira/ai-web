import { Component } from "@angular/core";

import { AiCheckbox } from "../checkbox";

@Component({
    imports: [AiCheckbox],
    template: `
        <div class="flex flex-col gap-y-4">
            <ai-checkbox shape="default">Checkbox padrão</ai-checkbox>
            <ai-checkbox shape="circle">Checkbox círculo</ai-checkbox>
        </div>
    `,
})
export class DemoCheckboxShapeComponent {}
