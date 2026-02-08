import { Component, input } from "@angular/core";
import { PrettyPrintPipe } from "./pretty-print.pipe";

@Component({
    selector: "ai-print",
    imports: [PrettyPrintPipe],
    template: `
        <div class="mt-2 bg-zinc-100 dark:bg-zinc-800 rounded py-3 pl-3 pr-5 w-full">
            <pre class="font-code text-sm font-medium dark:bg-zinc-800" [innerHTML]="obj() | prettyprint"></pre>
        </div>
    `,
})
export class PrettyPrintComponent<T> {
    obj = input.required<T>();
}
