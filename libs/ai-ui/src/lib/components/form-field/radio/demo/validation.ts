import { Component, signal } from "@angular/core";
import { form, FormField, required, submit } from "@angular/forms/signals";

import { AiButton } from "../../../button";
import { AiRadioImports } from "../radio.imports";

@Component({
    selector: "ai-demo-radio-validation",
    imports: [AiRadioImports, AiButton, FormField],
    template: `
        <div>
            <ai-radio-group [formField]="schemaForm.fruit">
                <ai-radio [value]="'apple'">Maçã</ai-radio>
                <ai-radio [value]="'banana'">Banana</ai-radio>
                <ai-radio [value]="'orange'">Laranja</ai-radio>
            </ai-radio-group>

            @if (submitted() && schemaForm().invalid()) {
                <p class="text-sm text-destructive mt-1">Selecione uma fruta.</p>
            }

            <div class="flex gap-2 my-4">
                <ai-button size="sm" variant="primary" (click)="onSubmit()">Validar</ai-button>
                <ai-button size="sm" fill="line" variant="destructive" (click)="onReset()">Resetar</ai-button>
            </div>

            <div class="text-sm my-4">
                <p>
                    <strong>Status:</strong>
                    @let invalid = schemaForm().invalid || false;
                    <span [class]="!invalid ? 'text-success' : 'text-destructive'">
                        {{ !invalid ? " válido ✓" : " inválido ✗" }}
                    </span>
                </p>
            </div>
        </div>
    `,
})
export class DemoRadioValidationComponent {
    schema = signal<{ fruit: string | null }>({ fruit: null });

    schemaForm = form(this.schema, schema => {
        required(schema.fruit);
    });

    submitted = signal(false);

    async onSubmit() {
        this.submitted.set(true);
        await submit(this.schemaForm, async () => {
            console.log("Válido ✓", this.schema());
            return [];
        });
    }

    onReset() {
        this.schema.set({ fruit: null });
        this.submitted.set(false);
        this.schemaForm().reset();
    }
}
