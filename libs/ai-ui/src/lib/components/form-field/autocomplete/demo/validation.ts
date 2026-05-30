import { Component, signal } from "@angular/core";
import { form, FormField, required, submit } from "@angular/forms/signals";

import { AiButton } from "../../../button";
import { AiAutocomplete } from "../autocomplete";
import { AiAutocompleteConfig } from "../autocomplete-config";

interface User {
    id: number;
    name: string;
    email: string;
}

const USERS: User[] = [
    { id: 1, name: "João Silva", email: "joao@email.com" },
    { id: 2, name: "Maria Santos", email: "maria@email.com" },
    { id: 3, name: "Pedro Oliveira", email: "pedro@email.com" },
    { id: 4, name: "Ana Costa", email: "ana@email.com" },
    { id: 5, name: "Lucas Pereira", email: "lucas@email.com" },
];

@Component({
    imports: [AiAutocomplete, FormField, AiButton],
    template: `
        <div class="flex flex-col gap-y-4 max-w-sm w-full">
            <ai-autocomplete class="w-full" label="Usuário" placeholder="Buscar usuário..." [config]="autoCompleteConfig" [formField]="schemaForm.userId" />

            <div class="flex gap-2">
                <ai-button size="sm" variant="primary" (click)="onConfirm()">Validar</ai-button>
                <ai-button size="sm" fill="line" variant="destructive" (click)="onReset()">Resetar</ai-button>
            </div>

            <div class="text-sm">
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
export class DemoAutocompleteValidationComponent {
    schema = signal<{ userId: number | null }>({ userId: null });

    schemaForm = form(this.schema, schema => {
        required(schema.userId, { message: "Usuário é obrigatório." });
    });

    autoCompleteConfig = new AiAutocompleteConfig<User, number>({
        data: USERS,
        keyword: ["name", "email"],
        useLabel: "name",
        useValue: "id",
        displayLabel: (item: User) => `${item.id} - ${item.name}`,
    });

    async onConfirm() {
        await submit(this.schemaForm, async () => {
            console.log("Válido ✓", this.schema());
            return [];
        });
    }

    onReset() {
        this.schema.set({ userId: null });
        this.schemaForm().reset();
    }
}
