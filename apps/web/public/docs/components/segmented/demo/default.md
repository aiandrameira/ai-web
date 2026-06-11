```angular-ts showLineNumbers copyButton
import { Component, signal } from "@angular/core";
import { form, FormField } from "@angular/forms/signals";

import { AiIconType } from "../../../icon";
import { AiSegmented } from "../segmented";
import { AiSegmentedItem } from "../segmented.interface";

@Component({
    imports: [AiSegmented, FormField],
    template: `
        <div class="flex flex-col gap-4">
            <span class="text-sm font-medium">Selecione uma opção:</span>
            <ai-segmented [items]="items" [formField]="schemaForm.view" />
            <p class="text-sm text-muted-foreground">
                Valor selecionado: <strong>{{ schema().view }}</strong>
            </p>
        </div>
    `,
})
export class DemoSegmentedDefaultComponent {
    schema = signal<{ view: string }>({ view: "list" });

    schemaForm = form(this.schema);

    items: AiSegmentedItem[] = [
        { value: "list", icon: "list-unordered" as AiIconType, label: "Lista" },
        { value: "grid", icon: "grid" as AiIconType, label: "Grade" },
        { value: "table", icon: "table" as AiIconType, label: "Tabela" },
    ];
}
```
