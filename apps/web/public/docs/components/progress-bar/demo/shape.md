```angular-ts showLineNumbers copyButton
import { Component, signal } from "@angular/core";

import { AiProgressBar } from "../progress-bar";

@Component({
    imports: [AiProgressBar],
    template: `
        <div class="flex items-center gap-x-4 md:gap-x-8 w-full max-w-2xl">
            <ai-progress-bar shape="circle" size="sm" [progress]="progress()" showLabel />
            <ai-progress-bar shape="circle" size="default" [progress]="progress()" showLabel />
            <ai-progress-bar shape="circle" size="lg" [progress]="progress()" showLabel />
        </div>
    `,
})
export class DemoProgressBarShapeComponent {
    progress = signal(72);
}
```
