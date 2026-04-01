import { Component } from "@angular/core";

import { AiProgressBar } from "../progress-bar";

@Component({
    imports: [AiProgressBar],
    template: `
        <div class="flex flex-col gap-y-4 w-full max-w-lg">
            <ai-progress-bar indeterminate />
            <ai-progress-bar variant="accent" indeterminate />
        </div>
    `,
})
export class DemoProgressBarIndeterminateComponent {}
