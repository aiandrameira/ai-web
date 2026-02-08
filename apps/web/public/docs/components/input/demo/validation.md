```angular-ts showLineNumbers copyButton
import { Component, signal } from "@angular/core";
import { form, FormField, minLength, required, submit, validate } from "@angular/forms/signals";
import { AiButton } from "../../../button";
import { AiInput } from "../input";
import { applyPasswordStrength } from "../interfaces";

interface Schema {
    name: string;
    email: string;
    pattern: string;
    password: string;
    confirmPassword: string;
    sg: string;
}

function makeSchema(): Schema {
    return {
        name: "",
        email: "",
        pattern: "",
        password: "",
        confirmPassword: "",
        sg: "",
    };
}

@Component({
    imports: [AiInput, FormField, AiButton],
    template: `
        <div class="flex flex-col gap-y-6 max-w-lg">
            <ai-input label="Name" [formField]="schemaForm.name" class="w-full" />
            <ai-input label="E-mail" type="email" [formField]="schemaForm.email" class="w-full" />
            <ai-input label="SG" [minlength]="2" [maxlength]="2" [formField]="schemaForm.sg" class="w-full" />

            <div class="grid grid-cols-2 gap-2">
                <ai-input label="Senha" [formField]="schemaForm.password" type="password" [strength]="true" class="w-full" />
                <ai-input label="Confirme a Senha" [formField]="schemaForm.confirmPassword" type="password" class="w-full" />
            </div>

            <div class="flex gap-2">
                <ai-button size="sm" variant="primary" type="button" (click)="onConfirm()">Validar</ai-button>
                <ai-button size="sm" fill="line" variant="destructive" type="button" (click)="reset()">Resetar</ai-button>
            </div>

            <div class="text-sm space-y-1">
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
export class DemoInputValidationComponent {
    schema = signal<Schema>(makeSchema());

    schemaForm = form(this.schema, schema => {
        minLength(schema.sg, 2, { message: "SG deve ter exatamente 2 caracteres." });
        required(schema.name, { message: "Nome é um campo obrigatório." });
        required(schema.password, { message: "A senha é um campo obrigatório." });
        minLength(schema.password, 8, { message: "A senha deve ter no mínimo 8 caracteres." });
        applyPasswordStrength(schema.password, 8);
        required(schema.confirmPassword, { message: "Por favor, confirme sua senha" });
        validate(schema.confirmPassword, ({ value, valueOf }) => {
            const confirmPassword = value();
            const password = valueOf(schema.password);
            if (confirmPassword !== password) {
                return {
                    kind: "passwordMismatch",
                    message: "As senhas não coincidem",
                };
            }
            return null;
        });
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
        this.schema.set(makeSchema());
        this.schemaForm().reset();
    }
}
```
