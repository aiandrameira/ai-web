import { Component, input } from "@angular/core";

import { AiPrintPipe } from "./print.pipe";

@Component({
    selector: "ai-print",
    imports: [AiPrintPipe],
    template: `
        <div class="mt-2 bg-zinc-100 dark:bg-zinc-800 rounded py-3 pl-3 pr-5 w-full">
            <pre class="font-code text-sm font-medium dark:bg-zinc-800" [innerHTML]="obj() | aiPrint"></pre>
        </div>
    `,
})
export class AiPrint<T> {
    obj = input.required<T>();
}
