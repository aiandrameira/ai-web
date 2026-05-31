import { Component, signal } from "@angular/core";
import { disabled, form, FormField } from "@angular/forms/signals";

import { AiInput } from "../input";

@Component({
    imports: [AiInput, FormField],
    template: `
        <div class="max-w-sm w-full">
            <ai-input class="w-full" label="Name" [formField]="form.name" />
        </div>
    `,
})
export class DemoInputDisabledComponent {
    schema = signal<{ name: string }>({ name: "" });

    form = form(this.schema, schema => {
        disabled(schema.name);
    });
}
