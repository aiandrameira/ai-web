import { ChangeDetectionStrategy, Component } from "@angular/core";

import { AiPrint } from "./print";

@Component({
    imports: [AiPrint],
    template: `
        <div class="flex flex-col gap-y-4">
            <h2 class="text-lg font-semibold">Print</h2>
            <ai-print [obj]="user" />
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiPrintDemo {
    user = {
        name: "John Doe",
        email: "johndoe@example.com",
        age: 30,
        city: "New York",
    };
}
