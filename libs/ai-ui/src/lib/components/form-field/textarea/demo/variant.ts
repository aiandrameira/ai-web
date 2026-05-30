import { Component, signal } from "@angular/core";
import { form, FormField } from "@angular/forms/signals";

import { AiTextarea } from "../textarea";

@Component({
    imports: [AiTextarea, FormField],
    template: `
        <div class="flex flex-col gap-y-6 max-w-sm w-full">
            <ai-textarea variant="standard" label="Standard" [formField]="form.standard" />
            <ai-textarea variant="outlined" label="Outlined" [formField]="form.outlined" />
            <ai-textarea variant="filled" label="Filled" placeholder="Filled textarea" [formField]="form.filled" />
        </div>
    `,
})
export class DemoTextareaVariantComponent {
    schema = signal<{ standard: string; outlined: string; filled: string }>({
        standard: "",
        outlined: "",
        filled: "",
    });

    form = form(this.schema);
}
