```angular-ts showLineNumbers copyButton
import { Component, signal } from "@angular/core";
import { form, FormField } from "@angular/forms/signals";

import { AiRadioImports } from "../radio.imports";

@Component({
    imports: [AiRadioImports, FormField],
    template: `
        <ai-radio-group [formField]="schemaForm.selected">
            <ai-radio size="normal" [value]="1">Opção normal</ai-radio>
            <ai-radio size="lg" [value]="2">Opção large</ai-radio>
        </ai-radio-group>
    `,
})
export class DemoRadioSizeComponent {
    schema = signal<{ selected: number | null }>({ selected: 1 });

    schemaForm = form(this.schema);
}
```
