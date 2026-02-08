import { ChangeDetectionStrategy, Component, effect, inject, signal, ViewEncapsulation } from "@angular/core";
import { AiLoaderService } from "./loader.service";

@Component({
    selector: "ai-loader-progress",
    exportAs: "aiLoaderProgress",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        @if (visible()) {
            <div class="pointer-events-none fixed left-0 top-0 z-9999 h-1 w-full overflow-hidden bg-transparent">
                <div class="h-full bg-primary" [style.width.%]="progress()" [style.opacity]="opacity()" [style.transition]="'width 0.3s ease-out, opacity 0.3s ease-out'"></div>
            </div>
        }
    `,
})
export class AiLoaderProgress {
    #loader = inject(AiLoaderService);
    isLoading = this.#loader.isLoading;

    progress = signal(0);
    visible = signal(false);
    opacity = signal(1);
    #interval: any = null;
    #finishTimeout: any = null;

    constructor() {
        effect(() => {
            const loading = this.isLoading();

            if (loading) {
                this._start();
            } else {
                this._finish();
            }
        });
    }

    private _start() {
        if (this.#interval) clearInterval(this.#interval);
        if (this.#finishTimeout) clearTimeout(this.#finishTimeout);

        this.visible.set(true);
        this.opacity.set(1);
        this.progress.set(0);

        this.#interval = setInterval(() => {
            const current = this.progress();
            if (current < 90) {
                const increment = current < 60 ? 5 : current < 80 ? 3 : 1;
                this.progress.set(Math.min(current + increment, 90));
            } else {
                clearInterval(this.#interval);
            }
        }, 200);
    }

    private _finish() {
        if (this.#interval) clearInterval(this.#interval);
        if (this.#finishTimeout) clearTimeout(this.#finishTimeout);

        this.progress.set(100);

        this.#finishTimeout = setTimeout(() => {
            this.opacity.set(0);

            setTimeout(() => {
                this.visible.set(false);
                this.progress.set(0);
                this.opacity.set(1);
            }, 300);
        }, 400);
    }
}
