import { Component, inject } from "@angular/core";

import { AiButton } from "../../button";
import { AiToastService } from "../toast.service";

@Component({
    selector: "ai-demo-toast-position",
    imports: [AiButton],
    template: `
        <div class="flex items-center flex-col gap-y-4">
            <div class="flex items-center gap-x-2">
                <ai-button size="sm" (click)="showTopLeft()">
                    <span class="text-xs sm:text-sm">top-left</span>
                </ai-button>
                <ai-button size="sm" (click)="showTopCenter()">
                    <span class="text-xs sm:text-sm">top-center</span>
                </ai-button>
                <ai-button size="sm" (click)="showTopRight()">
                    <span class="text-xs sm:text-sm">top-right</span>
                </ai-button>
            </div>

            <div class="flex items-center gap-x-2">
                <ai-button size="sm" (click)="showBottomLeft()">
                    <span class="text-xs sm:text-sm">bottom-left</span>
                </ai-button>
                <ai-button size="sm" (click)="showBottomCenter()">
                    <span class="text-xs sm:text-sm">bottom-center</span>
                </ai-button>
                <ai-button size="sm" (click)="showBottomRight()">
                    <span class="text-xs sm:text-sm">bottom-right</span>
                </ai-button>
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
