```angular-ts showLineNumbers copyButton
import { Component, signal } from "@angular/core";
import { disabled, form, FormField } from "@angular/forms/signals";

import { AiTextarea } from "../textarea";

@Component({
    imports: [AiTextarea, FormField],
    template: `
        <div class="max-w-sm w-full">
            <ai-textarea class="w-full" label="Description" [formField]="form.description" />
        </div>
    `,
})
export class DemoTextareaDisabledComponent {
    schema = signal<{ description: string }>({ description: "" });

    form = form(this.schema, schema => {
        disabled(schema.description);
    });
}
```
