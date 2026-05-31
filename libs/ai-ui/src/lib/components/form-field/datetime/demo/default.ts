import { Component, signal } from "@angular/core";
import { form, FormField } from "@angular/forms/signals";

import { AiDatetime } from "../datetime";

@Component({
    imports: [AiDatetime, FormField],
    template: `
        <div class="flex flex-col items-center gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md">
            <ai-datetime class="w-75" id="dtInfracao" type="datetime-local" label="Datetime Local" [formField]="schemaForm.dtInfracao" />
            <ai-datetime class="w-75" id="dtMovimento" type="date" label="Date" [formField]="schemaForm.dtMovimento" />
            <ai-datetime class="w-75" id="hrMovimento" type="time" label="Time" [formField]="schemaForm.hrMovimento" />
            <ai-datetime class="w-75" id="msMovimento" type="month" label="Month" [formField]="schemaForm.msMovimento" />
        </div>
    `,
})
export class DemoDatetimeDefaultComponent {
    schema = signal<{ dtInfracao: string; dtMovimento: string; hrMovimento: string; msMovimento: string }>({
        dtInfracao: "",
        dtMovimento: "",
        hrMovimento: "",
        msMovimento: "",
    });

    schemaForm = form(this.schema);
}
