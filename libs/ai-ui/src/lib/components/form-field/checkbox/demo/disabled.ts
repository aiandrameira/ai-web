import { Component } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

import { AiCheckbox } from "../checkbox";

@Component({
    imports: [AiCheckbox, ReactiveFormsModule],
    template: `
        <div class="flex flex-col gap-y-4">
            <ai-checkbox>Checkbox</ai-checkbox>
            <ai-checkbox [formControl]="control">Checkbox disabled</ai-checkbox>
        </div>
    `,
})
export class DemoCheckboxDisabledComponent {
    control = new FormControl({ value: true, disabled: true });
}
