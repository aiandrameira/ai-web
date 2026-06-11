import { Component, signal } from "@angular/core";
import { form, FormField } from "@angular/forms/signals";

import { AiRadioImports } from "../radio.imports";

@Component({
    selector: "ai-demo-radio-default",
    imports: [AiRadioImports, FormField],
    template: `
        <ai-radio-group [formField]="schemaForm.selected" class="flex flex-col gap-2">
            <ai-radio variant="primary" [value]="1">Opção 1</ai-radio>
            <ai-radio variant="accent" [value]="2">Opção 2</ai-radio>
            <ai-radio variant="destructive" [value]="3">Opção 3</ai-radio>
        </ai-radio-group>
    `,
})
export class DemoRadioDefaultComponent {
    schema = signal<{ selected: number | null }>({ selected: 1 });

    schemaForm = form(this.schema);
}
