import { Component, signal } from "@angular/core";

import { AiProgressBar } from "../progress-bar";

@Component({
    selector: "ai-demo-progress-bar-size",
    imports: [AiProgressBar],
    template: `
        <div class="flex flex-col gap-y-4 w-full max-w-lg">
            <ai-progress-bar size="sm" [progress]="progress()" />
            <ai-progress-bar size="default" [progress]="progress()" showLabel />
            <ai-progress-bar size="lg" [progress]="progress()" showLabel />
        </div>
    `,
})
export class DemoProgressBarSizeComponent {
    progress = signal(45);
}
