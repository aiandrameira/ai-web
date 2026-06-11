```angular-ts showLineNumbers copyButton
import { Component, signal } from "@angular/core";
import { form, FormField } from "@angular/forms/signals";

import { AiInput } from "../input";
import { AiMaskConfig } from "../interfaces";

@Component({
    imports: [AiInput, FormField],
    template: `
        <div class="max-w-sm w-full">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <ai-input class="w-full" label="Currency" [formField]="form.currency" [maskConfig]="currencyMaskConfig" />
                <ai-input class="w-full" label="CpfCnpj" [formField]="form.cpfCnpj" mask="000.000.000-00||00.000.000/0000-00" />
                <ai-input class="w-full" label="Phone" [formField]="form.phone" mask="(00) 00000-0000" />
                <ai-input class="w-full" label="Custom" [formField]="form.custom" mask="0000/0000" />
            </div>
        </div>
    `,
})
export class DemoInputMaskComponent {
    schema = signal<{ currency: number; cpfCnpj: string; phone: string; custom: string }>({
        currency: 35245,
        cpfCnpj: "04634886529",
        phone: "77988546525",
        custom: "01012024",
    });

    form = form(this.schema);

    currencyMaskConfig: AiMaskConfig = {
        isCurrency: true,
        decimal: ",",
        prefix: "R$ ",
        thousands: ".",
        align: "left",
    };
}
```
