```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";

import { AiDatetime } from "../datetime";

@Component({
    imports: [AiDatetime],
    template: `
        <div class="flex flex-col items-center gap-4 w-[400px]">
            <ai-datetime class="w-[300px]" id="dtDisabled" type="date" label="Data desabilitada" [disabled]="true" />
            <ai-datetime class="w-[300px]" id="dtReadonly" type="date" label="Data somente leitura" [readonly]="true" value="2026-04-01" />
        </div>
    `,
})
export class DemoDatetimeDisabledComponent {}
```
