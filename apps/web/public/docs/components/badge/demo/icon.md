```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";
import { AiBadge } from "../badge";

@Component({
    imports: [AiBadge],
    template: `
        <div class="flex items-center justify-center gap-x-4">
            <ai-badge variant="primary" icon="stack">icon</ai-badge>
            <ai-badge shape="default" variant="default" icon="timer">59:59</ai-badge>
        </div>
    `,
})
export class DemoBadgeIconComponent {}
```
