import { Injectable, computed, signal } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class AiLoaderService {
    #loader = signal<number>(0);

    readonly isLoading = computed(() => this.#loader() > 0);

    show() {
        this.#loader.update((count: number) => count + 1);
    }

    hide() {
        this.#loader.update((count: number) => Math.max(count - 1, 0));
    }

    reset() {
        this.#loader.set(0);
    }
}
