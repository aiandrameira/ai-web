import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from "@angular/core";
import { AiToastContent } from "./toast-content";
import { AiToastConfig, AiToastPosition } from "./toast.config";
import { AiToastService } from "./toast.service";
import { toastVariants } from "./toast.variants";

@Component({
    selector: "ai-toast, ai-toaster",
    exportAs: "aiToast",
    imports: [AiToastContent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        @for (position of positions; track position) {
        <div [class]="positionContainer(position)">
            @for (toast of toasts()[position]; track toast.id) {
            <ai-toast-content class="w-full" [toast]="toast" (undo)="remove(toast.id)" />
            }
        </div>
        }
    `,
})
export class AiToast {
    #toastService = inject(AiToastService);

    readonly positions: AiToastPosition[] = ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"];

    protected readonly toasts = computed(() => {
        const config = this.#toastService.toastConfig;
        const positions: Record<AiToastPosition, AiToastConfig[]> = {
            "top-left": [],
            "top-center": [],
            "top-right": [],
            "bottom-left": [],
            "bottom-center": [],
            "bottom-right": [],
        };

        config().forEach(toast => positions[toast.position || "bottom-center"].push(toast));
        return positions;
    });

    protected readonly positionContainer = (position: AiToastPosition) => toastVariants({ position });

    remove(id: number) {
        this.#toastService.remove(id);
    }
}
