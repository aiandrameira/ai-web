import { Component, inject } from "@angular/core";

import { AiButton } from "../../button";
import { AiToastService } from "../toast.service";

@Component({
    imports: [AiButton],
    template: `
        <div class="flex items-center justify-center gap-4 flex-wrap">
            <ai-button size="sm" (click)="showDefault()">default</ai-button>
            <ai-button size="sm" (click)="showSuccess()">success</ai-button>
            <ai-button size="sm" (click)="showDestructive()">destructive</ai-button>
            <ai-button size="sm" (click)="showWarning()">warning</ai-button>
            <ai-button size="sm" (click)="showInfo()">info</ai-button>
        </div>
    `,
})
export class DemoToastTypeComponent {
    #toast = inject(AiToastService);

    showDefault() {
        this.#toast.default({ message: "Toast default" });
    }

    showSuccess() {
        this.#toast.success({ message: "Toast success" });
    }

    showDestructive() {
        this.#toast.destructive({ message: "Toast destructive" });
    }

    showWarning() {
        this.#toast.warning({ message: "Toast warning" });
    }

    showInfo() {
        this.#toast.info({ message: "Toast info" });
    }
}
