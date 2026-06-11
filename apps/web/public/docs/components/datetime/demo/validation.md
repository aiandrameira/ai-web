```angular-ts showLineNumbers copyButton
import { Component, signal } from "@angular/core";
import { form, FormField, required, submit } from "@angular/forms/signals";

import { AiButton } from "../../../button";
import { AiDatetime } from "../datetime";

@Component({
    imports: [AiDatetime, FormField, AiButton],
    template: `
        <div class="flex flex-col gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md">
            <ai-datetime class="w-full" id="dtRequired" type="date" label="Data obrigatória" [formField]="schemaForm.date" />

            <div class="flex gap-2">
                <button ai-button size="sm" variant="primary" (click)="onSubmit()">Validar</button>
                <button ai-button size="sm" fill="line" variant="destructive" (click)="onReset()">Resetar</button>
            </div>

            <div class="text-sm">
                <p>
                    <strong>Status:</strong>
                    @let inv = schemaForm().invalid || false;
                    <span [class]="!inv ? 'text-success' : 'text-destructive'">
                        {{ !inv ? " válido ✓" : " inválido ✗" }}
                    </span>
                </p>
            </div>
        </div>
    `,
})
export class DemoDatetimeValidationComponent {
    schema = signal<{ date: string }>({ date: "" });

    schemaForm = form(this.schema, schema => {
        required(schema.date, { message: "A data é obrigatória." });
    });

    async onSubmit() {
        await submit(this.schemaForm, async () => {
            console.log("Válido ✓", this.schema());
            return [];
        });
    }

    onReset() {
        this.schema.set({ date: "" });
        this.schemaForm().reset();
    }
}
```
