```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";

import { AiDatePicker } from "../date-picker";

@Component({
    imports: [AiDatePicker],
    template: `
        <div class="flex flex-col gap-4 w-[280px]">
            <ai-date-picker placeholder="Data com mínimo e máximo" minDate="2026-01-01" maxDate="2026-12-31" [(value)]="selectedDate" />
            <p class="text-sm text-muted-foreground">
                Valor selecionado: <strong>{{ selectedDate || "nenhum" }}</strong>
            </p>
        </div>
    `,
})
export class DemoDatePickerRangeComponent {
    selectedDate = "";
}
```
