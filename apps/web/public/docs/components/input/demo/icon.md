```angular-ts showLineNumbers copyButton
import { Component, signal } from "@angular/core";
import { form, FormField } from "@angular/forms/signals";
import { AiInput } from "../input";

@Component({
    imports: [AiInput, FormField],
    template: `
        <div class="max-w-sm w-full">
            <ai-input class="w-full" label="Ícone" [formField]="form.name" icon="emoji-sticker" (changeIcon)="onIcon()" />
        </div>
    `,
})
export class DemoInputIconComponent {
    schema = signal<{ name: string }>({ name: "" });

    form = form(this.schema);

    onIcon() {
        console.log("emoji-sticker");
    }
}
```
