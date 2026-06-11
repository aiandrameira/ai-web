```angular-ts showLineNumbers copyButton
import { Component, signal } from "@angular/core";
import { disabled, form, FormField } from "@angular/forms/signals";

import { AiRadioImports } from "../radio.imports";

@Component({
    selector: "ai-demo-radio-disabled",
    imports: [AiRadioImports, FormField],
    template: `
        <ai-radio-group [formField]="schemaForm.selected" class="flex items-center gap-x-6">
            <ai-radio [value]="1">Opção 1</ai-radio>
            <ai-radio [value]="2">Opção 2</ai-radio>
        </ai-radio-group>
    `,
})
export class DemoRadioDisabledComponent {
    schema = signal<{ selected: number | null }>({ selected: 2 });

    schemaForm = form(this.schema, schema => {
        disabled(schema.selected);
    });
}
```
