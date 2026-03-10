```angular-ts showLineNumbers copyButton
import { Component, inject, signal } from "@angular/core";
import { form, FormField, required, submit } from "@angular/forms/signals";

import { AiButton } from "../../../button";
import { AiToastService } from "../../../toast";
import { AiCheckbox } from "../checkbox";

@Component({
    imports: [AiCheckbox, AiButton, FormField],
    template: `
        <div class="flex flex-col gap-4">
            <ai-checkbox [formField]="checkbox.value"> Li e aceito os termos de uso </ai-checkbox>

            <div class="flex gap-2">
                <button ai-button type="button" size="sm" variant="default" (click)="onConfirm()">Validar</button>
                <button ai-button type="button" size="sm" variant="outline" (click)="reset()">Resetar</button>
            </div>

            <div class="text-sm space-y-1">
                <strong>Status:</strong>
                @let invalid = checkbox().invalid() || false;
                <span [class]="invalid ? 'text-destructive' : 'text-success'">
                    {{ invalid ? " inválido ✗" : " válido ✓" }}
                </span>
                <p><strong>Valor:</strong> {{ !this.control().value ? "desmarcado" : "marcado" }}</p>
            </div>
        </div>
    `,
})
export class DemoCheckboxValidationComponent {
    #toast = inject(AiToastService);

    control = signal({
        value: false,
    });

    checkbox = form(this.control, schema => {
        required(schema.value);
    });

    async onConfirm() {
        await submit(this.checkbox, async () => {
            console.log("válido ✓", this.control());
            return [];
        });

        if (this.checkbox().invalid()) {
            console.log("inválido ✗", this.checkbox().value());
            this.#toast.warning({ message: "Você deve aceitar os termos de uso para continuar." });
        }
    }

    reset() {
        this.control.set({ value: false });
        this.checkbox().reset();
    }
}
```
