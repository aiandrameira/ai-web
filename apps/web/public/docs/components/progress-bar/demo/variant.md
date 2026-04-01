```angular-ts showLineNumbers copyButton
import { Component, signal } from "@angular/core";

import { AiProgressBar } from "../progress-bar";

@Component({
    imports: [AiProgressBar],
    template: `
        <div class="flex flex-col gap-y-4 w-full max-w-lg">
            <ai-progress-bar variant="primary" [progress]="progress()" />
            <ai-progress-bar variant="accent" [progress]="progress()" />
        </div>
    `,
})
export class DemoProgressBarVariantComponent {
    progress = signal(60);
}
```
