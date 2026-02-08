import { Component, inject } from "@angular/core";
import { AiButton } from "../../button";
import { AiToastService } from "../toast.service";

@Component({
    imports: [AiButton],
    template: `
        <div class="flex items-center flex-col gap-y-4">
            <div class="flex items-center gap-x-2">
                <ai-button size="sm" (click)="showTopLeft()">top-left</ai-button>
                <ai-button size="sm" (click)="showTopCenter()">top-center</ai-button>
                <ai-button size="sm" (click)="showTopRight()">top-right</ai-button>
            </div>

            <div class="flex items-center gap-x-2">
                <ai-button size="sm" (click)="showBottomLeft()">bottom-left</ai-button>
                <ai-button size="sm" (click)="showBottomCenter()">bottom-center</ai-button>
                <ai-button size="sm" (click)="showBottomRight()">bottom-right</ai-button>
            </div>
        </div>
    `,
})
export class DemoToastPositionComponent {
    #toast = inject(AiToastService);

    showTopLeft() {
        this.#toast.default({ message: "Toast top left", position: "top-left" });
    }

    showTopRight() {
        this.#toast.default({ message: "Toast top right", position: "top-right" });
    }

    showTopCenter() {
        this.#toast.default({ message: "Toast top center", position: "top-center" });
    }

    showBottomLeft() {
        this.#toast.default({ message: "Toast bottom left", position: "bottom-left" });
    }

    showBottomRight() {
        this.#toast.default({ message: "Toast bottom right", position: "bottom-right" });
    }

    showBottomCenter() {
        this.#toast.default({ message: "Toast bottom center", position: "bottom-center" });
    }
}
