import { Component, inject } from "@angular/core";

import { AiButton } from "../../button";
import { AiToastService } from "../toast.service";

@Component({
    selector: "ai-demo-toast-default",
    imports: [AiButton],
    template: `
        <div class="flex items-center justify-center w-full max-w-sm">
            <ai-button size="sm" (click)="showToast()">Show toast</ai-button>
        </div>
    `,
})
export class DemoToastDefaultComponent {
    #toast = inject(AiToastService);

    showToast() {
        this.#toast.default({
            message: "Toast message",
            description: "Certifique-se de que os campos estejam válidos.",
            icon: "alarm-warning",
        });
    }
}
