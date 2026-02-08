```angular-ts showLineNumbers copyButton
import { Component, signal } from "@angular/core";
import { form, FormField, minLength, required } from "@angular/forms/signals";
import { AiInput } from "../input";

@Component({
    imports: [AiInput, FormField],
    template: `
        <div class="max-w-sm w-full">
            <ai-input class="w-full" label="Senha" type="password" [formField]="form.password" />
        </div>
    `,
})
export class DemoInputPasswordComponent {
    schema = signal<{ password: string }>({ password: "" });

    form = form(this.schema, schema => {
        required(schema.password, { message: "A senha é um campo obrigatória." });
        minLength(schema.password, 6, { message: "A senha deve ter no mínimo 6 caracteres." });
    });
}
```
