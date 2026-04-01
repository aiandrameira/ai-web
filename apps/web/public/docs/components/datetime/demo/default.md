```angular-ts showLineNumbers copyButton
import { Component, signal } from "@angular/core";
import { form, FormField } from "@angular/forms/signals";

import { AiDatetime } from "../datetime";

@Component({
    imports: [AiDatetime, FormField],
    template: `
        <div class="flex flex-col items-center gap-4 w-[600px]">
            <ai-datetime class="w-[300px]" id="dtInfracao" type="datetime-local" label="Datetime Local" [formField]="schemaForm.dtInfracao" />
            <ai-datetime class="w-[300px]" id="dtMovimento" type="date" label="Date" [formField]="schemaForm.dtMovimento" />
            <ai-datetime class="w-[300px]" id="hrMovimento" type="time" label="Time" [formField]="schemaForm.hrMovimento" />
            <ai-datetime class="w-[300px]" id="msMovimento" type="month" label="Month" [formField]="schemaForm.msMovimento" />
        </div>
    `,
})
export class DemoDatetimeDefaultComponent {
    schema = signal({
        dtInfracao: "",
        dtMovimento: "",
        hrMovimento: "",
        msMovimento: "",
    });

    schemaForm = form(this.schema);
}
```
