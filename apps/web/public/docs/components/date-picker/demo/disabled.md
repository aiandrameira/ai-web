```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";

import { AiDatePicker } from "../date-picker";

@Component({
    imports: [AiDatePicker],
    template: `
        <div class="flex flex-col gap-4 w-70">
            <ai-date-picker placeholder="Desabilitado" [disabled]="true" />
        </div>
    `,
})
export class DemoDatePickerDisabledComponent {}
```
