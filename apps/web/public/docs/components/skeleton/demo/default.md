```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";

import { AiSkeleton } from "../skeleton";

@Component({
    imports: [AiSkeleton],
    template: `
        <div class="flex items-center gap-x-4">
            <ai-skeleton class="h-12 w-12 rounded-full" />
            <div class="space-y-2">
                <ai-skeleton class="h-4 w-62.5" />
                <ai-skeleton class="h-4 w-50" />
            </div>
        </div>
    `,
})
export class DemoSkeletonDefaultComponent {}
```
