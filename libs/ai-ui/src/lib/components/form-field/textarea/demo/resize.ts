import { Component, signal } from "@angular/core";
import { form, FormField } from "@angular/forms/signals";

import { AiTextarea } from "../textarea";

@Component({
    imports: [AiTextarea, FormField],
    template: `
        <div class="flex flex-col gap-y-6 max-w-sm w-full">
            <ai-textarea resize="none" label="Resize None (padrão)" [formField]="form.none" />
            <ai-textarea resize="vertical" label="Resize Vertical" [formField]="form.vertical" />
            <ai-textarea resize="both" label="Resize Both" [formField]="form.both" />
        </div>
    `,
})
export class DemoTextareaResizeComponent {
    schema = signal<{ none: string; vertical: string; both: string }>({
        none: "",
        vertical: "",
        both: "",
    });

    form = form(this.schema);
}
