import { Component, signal } from "@angular/core";
import { email, form, FormField, required } from "@angular/forms/signals";

import { AiButton } from "../../button";
import { AiInput } from "../../form-field/input";
import { AiStepperImports } from "../stepper.imports";

interface Schema {
    name: string;
    email: string;
}

function makeSchema(): Schema {
    return { name: "", email: "" };
}

@Component({
    selector: "ai-demo-stepper-validation",
    imports: [AiStepperImports, AiButton, AiInput, FormField],
    template: `
        <div class="w-full max-w-xl">
            <ai-stepper #stepper="aiStepper" linear>
                <ai-step label="Identificação" [completed]="!schemaForm.name().invalid()">
                    <div class="flex flex-col gap-y-4 pt-4">
                        <ai-input label="Nome" [formField]="schemaForm.name" class="w-full" />

                        <div class="flex items-center justify-end">
                            <button ai-button (click)="stepper.next()" [disabled]="schemaForm.name().invalid()">Próximo</button>
                        </div>
                    </div>
                </ai-step>

                <ai-step label="Contestação" [completed]="!schemaForm.email().invalid()">
                    <div class="flex flex-col gap-y-4 pt-4">
                        <ai-input label="E-mail" type="email" [formField]="schemaForm.email" class="w-full" />

                        <div class="flex items-center justify-end gap-x-2">
                            <button ai-button variant="outline" (click)="stepper.previous()">Voltar</button>
                            <button ai-button (click)="stepper.next()" [disabled]="schemaForm.email().invalid()">Próximo</button>
                        </div>
                    </div>
                </ai-step>

                <ai-step label="Resumo">
                    <div class="flex flex-col gap-y-4 pt-4">
                        <p class="text-sm text-muted-foreground">
                            Nome: <span class="text-foreground font-medium">{{ schemaForm.name().value() }}</span>
                        </p>
                        <p class="text-sm text-muted-foreground">
                            E-mail: <span class="text-foreground font-medium">{{ schemaForm.email().value() }}</span>
                        </p>

                        <div class="flex items-center justify-end">
                            <button ai-button variant="outline" (click)="stepper.previous()">Voltar</button>
                        </div>
                    </div>
                </ai-step>
            </ai-stepper>
        </div>
    `,
})
export class DemoStepperValidationComponent {
    readonly schema = signal<Schema>(makeSchema());

    readonly schemaForm = form(this.schema, s => {
        required(s.name, { message: "Nome é obrigatório." });
        required(s.email, { message: "E-mail é obrigatório." });
        email(s.email, { message: "Informe um e-mail válido." });
    });
}
