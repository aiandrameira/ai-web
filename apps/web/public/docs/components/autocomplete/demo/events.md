```angular-ts showLineNumbers copyButton
import { Component, signal } from "@angular/core";
import { form, FormField } from "@angular/forms/signals";

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
    imports: [AiAutocomplete, FormField],
    template: `
        <div class="max-w-sm w-full">
            <ai-autocomplete
                class="w-full"
                label="Usuário"
                placeholder="Selecione um usuário"
                [config]="autoCompleteConfig"
                [formField]="schemaForm.userId"
                (changeSelected)="onUserSelected($event)"
                (changeValue)="onValueChanged($event)"
            />
        </div>
    `,
})
export class DemoAutocompleteEventsComponent {
    schema = signal<{ userId: number | null }>({ userId: null });

    schemaForm = form(this.schema);

    autoCompleteConfig = new AiAutocompleteConfig<User, number>({
        data: USERS,
        keyword: ["name", "email"],
        useLabel: "name",
        useValue: "id",
        displayLabel: (item: User) => `${item.id} - ${item.name}`,
    });

    onUserSelected(user: User) {
        console.log("Usuário selecionado (objeto completo):", user);
    }

    onValueChanged(userId: number | null) {
        console.log("ID alterado:", userId);
    }
}
```
