```angular-ts showLineNumbers copyButton
import { Component, signal } from "@angular/core";
import { form, FormField } from "@angular/forms/signals";

import { AiPrint } from "../../../../core";
import { AiButton } from "../../../button";
import { AiInput } from "../input";

interface Schema {
    alfa: string;
    alfanum: string;
    numeric: number | null;
    hyphen: string;
}

function makeSchema(): Schema {
    return {
        alfa: "",
        alfanum: "",
        numeric: null,
        hyphen: "",
    };
}

@Component({
    imports: [AiInput, FormField, AiPrint, AiButton],
    template: `
        <div class="max-w-sm w-full flex flex-col gap-y-4">
            <div class="grid grid-cols-2 gap-y-4 gap-x-2">
                <ai-input class="w-full" label="Alfa" [formField]="form.alfa" [normalize]="'alfa'" />
                <ai-input class="w-full" label="Alfanum" [formField]="form.alfanum" [normalize]="'alfanum'" />
                <ai-input class="w-full" label="Numeric" type="number" [formField]="form.numeric" [normalize]="'numeric'" />
                <ai-input class="w-full" label="Hyphen" [formField]="form.hyphen" [normalize]="'alfanum'" [normalizeConfig]="{ hyphen: true }" />
            </div>
            <ai-button variant="primary" fill="line" size="sm" (click)="onReset()">Resetar</ai-button>

            <ai-print class="w-full" [obj]="schema()" />

            <div class="text-sm space-y-1">
                <p><b>alfa:</b> permite somente letras</p>
                <p><b>alfanum:</b> permite letras e números</p>
                <p><b>numeric:</b> permite somente números</p>
                <p><b>hyphen:</b> permite letras, números e hífen</p>
            </div>
        </div>
    `,
})
export class DemoInputNormalizeComponent {
    schema = signal<Schema>(makeSchema());

    form = form(this.schema);

    onReset() {
        this.schema.set(makeSchema());
    }
}
```
