```angular-ts showLineNumbers copyButton
import { Component, signal } from "@angular/core";
import { form, FormField } from "@angular/forms/signals";
import { AiInput } from "../input";

@Component({
    imports: [AiInput, FormField],
    template: `
        <div class="flex flex-col gap-y-6 max-w-sm w-full">
            <ai-input variant="standard" label="Standard" [formField]="form.standard" />
            <ai-input variant="outlined" label="Outlined" [formField]="form.outlined" />
            <ai-input variant="filled" label="Filled" placeholder="Filled input" [formField]="form.filled" />
        </div>
    `,
})
export class DemoInputVariantComponent {
    schema = signal<{ standard: string; outlined: string; filled: string }>({
        standard: "",
        outlined: "",
        filled: "",
    });

    form = form(this.schema);
}
```
