```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";
import { AiBadge } from "../badge";

@Component({
    imports: [AiBadge],
    template: `
        <div class="flex items-center justify-center gap-4">
            <ai-badge shape="default">default</ai-badge>
            <ai-badge shape="circle">circle</ai-badge>
        </div>
    `,
})
export class DemoBadgeShapeComponent {}
```
