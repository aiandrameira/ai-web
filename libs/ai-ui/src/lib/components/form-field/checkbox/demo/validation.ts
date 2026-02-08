import { Component } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";

import { AiButton } from "../../../button";
import { AiCheckbox } from "../checkbox";

@Component({
    imports: [AiCheckbox, AiButton, ReactiveFormsModule],
    template: `
        <div class="flex flex-col gap-4">
            <ai-checkbox [formControl]="control"> Li e aceito os termos de uso </ai-checkbox>

            <div class="flex gap-2">
                <button ai-button type="button" size="sm" variant="default" (click)="validate()">Validar</button>
                <button ai-button type="button" size="sm" variant="outline" (click)="reset()">Resetar</button>
            </div>

            <div class="text-sm space-y-1">
                <p><strong>Valor:</strong> {{ control.value ? "marcado" : "desmarcado" }}</p>
                <p>
                    <strong>Status:</strong> <span [class]="control.valid ? 'text-green-600' : 'text-red-600'">{{ control.valid ? " válido ✓" : " inválido ✗" }}</span>
                </p>
                <p><strong>Tocado:</strong> {{ control.touched ? "sim" : "não" }}</p>
                <p><strong>Sujo:</strong> {{ control.dirty ? "sim" : "não" }}</p>
            </div>
        </div>
    `,
})
export class DemoCheckboxValidationComponent {
    control = new FormControl(false, Validators.requiredTrue);

    validate() {
        this.control.markAsTouched();
        this.control.updateValueAndValidity();
    }

    reset() {
        this.control.reset(false);
        this.control.markAsUntouched();
        this.control.markAsPristine();
    }
}
