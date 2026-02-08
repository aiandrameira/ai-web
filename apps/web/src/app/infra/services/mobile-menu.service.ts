import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class MobileMenuService {
    readonly #open = signal<boolean>(false);
    readonly isOpen = this.#open.asReadonly();

    toggle() {
        this.#open.update(current => !current);
    }

    close() {
        this.#open.set(false);
    }

    open() {
        this.#open.set(true);
    }
}
