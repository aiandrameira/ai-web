import { Component, signal } from "@angular/core";
import { disabled, form, FormField } from "@angular/forms/signals";

import { AiCheckbox } from "../checkbox";

@Component({
    imports: [AiCheckbox, FormField],
    template: `
        <div class="flex items-center justify-center gap-x-4 w-full max-w-sm">
            <ai-checkbox [disabled]="true">Disabled</ai-checkbox>
            <ai-checkbox [formField]="form">Disabled</ai-checkbox>
        </div>
    `,
})
export class DemoCheckboxDisabledComponent {
    state = signal(true);

    form = form(this.state, schema => disabled(schema));
}
