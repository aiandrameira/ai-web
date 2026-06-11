```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";

import { AiDatetime } from "../datetime";

@Component({
    imports: [AiDatetime],
    template: `
        <div class="flex flex-col items-center gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md">
            <ai-datetime class="w-75" id="dtDisabled" type="date" label="Data desabilitada" [disabled]="true" />
            <ai-datetime class="w-75" id="dtReadonly" type="date" label="Data somente leitura" [readonly]="true" value="2026-04-01" />
        </div>
    `,
})
export class DemoDatetimeDisabledComponent {}
```
