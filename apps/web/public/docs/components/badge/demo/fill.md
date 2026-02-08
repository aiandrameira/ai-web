```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";
import { AiBadge } from "../badge";

@Component({
    imports: [AiBadge],
    template: `
        <div class="flex flex-col gap-y-4">
            <h2 class="text-primary font-semibold text-base">default</h2>
            <div class="flex items-center flex-wrap gap-2">
                <ai-badge fill="default" variant="primary">primary</ai-badge>
                <ai-badge fill="default" variant="accent">accent</ai-badge>
                <ai-badge fill="default" variant="destructive">destructive</ai-badge>
                <ai-badge fill="default" variant="info">info</ai-badge>
                <ai-badge fill="default" variant="success">success</ai-badge>
                <ai-badge fill="default" variant="warning">warning</ai-badge>
            </div>

            <h2 class="text-primary font-semibold text-base">line</h2>
            <div class="flex items-center flex-wrap gap-2">
                <ai-badge fill="line" variant="primary">primary</ai-badge>
                <ai-badge fill="line" variant="accent">accent</ai-badge>
                <ai-badge fill="line" variant="destructive">destructive</ai-badge>
                <ai-badge fill="line" variant="info">info</ai-badge>
                <ai-badge fill="line" variant="success">success</ai-badge>
                <ai-badge fill="line" variant="warning">warning</ai-badge>
            </div>
        </div>
    `,
})
export class DemoBadgeFillComponent {}
```
