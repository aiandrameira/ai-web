import { Component, signal } from "@angular/core";
import { form, FormField, minLength, required, submit } from "@angular/forms/signals";

import { AiButton } from "../../../button";
import { AiTextarea } from "../textarea";

@Component({
    imports: [AiTextarea, FormField, AiButton],
    template: `
        <div class="flex flex-col gap-y-6 max-w-lg">
            <ai-textarea label="Description" [formField]="schemaForm.description" [minlength]="10" [maxlength]="200" class="w-full" />

            <div class="flex gap-2">
                <ai-button size="sm" variant="primary" type="button" (click)="onConfirm()">Validar</ai-button>
                <ai-button size="sm" fill="line" variant="destructive" type="button" (click)="reset()">Resetar</ai-button>
            </div>
        </div>
    `,
})
export class DemoTextareaValidationComponent {
    schema = signal<{ description: string }>({ description: "" });

    schemaForm = form(this.schema, schema => {
        required(schema.description, { message: "Descrição é um campo obrigatório." });
        minLength(schema.description, 10, { message: "A descrição deve ter no mínimo 10 caracteres." });
    });

    async onConfirm() {
        await submit(this.schemaForm, async () => {
            console.log("válido ✓", this.schema());
            return [];
        });

        if (this.schemaForm().invalid) {
            console.log("inválido ✗", this.schemaForm().invalid);
        }
    }

    reset() {
        this.schema.set({ description: "" });
        this.schemaForm().reset();
    }
}
