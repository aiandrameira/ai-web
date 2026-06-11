import { computed, Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class KeyboardService {
    #focusedIndex = signal(-1);

    protected focusedIndex = computed(() => this.#focusedIndex());

    reset() {
        this.#focusedIndex.set(-1);
    }

    navigate(direction: number, items: HTMLElement[]) {
        if (!items.length) return;

        let next = this.#focusedIndex() + direction;
        if (next < 0) next = items.length - 1;
        if (next >= items.length) next = 0;

        this.focus(items, next);
    }

    focus(items: HTMLElement[], index: number) {
        if (index < 0 || index >= items.length) return;
        this.#focusedIndex.set(index);

        items.forEach((el, i) => {
            if (i === index) {
                el.focus();
                el.setAttribute("data-highlighted", "");
            } else {
                el.removeAttribute("data-highlighted");
            }
        });
    }

    focusFirst(items: HTMLElement[]) {
        if (items.length > 0) this.focus(items, 0);
    }

    focusLast(items: HTMLElement[]) {
        if (items.length > 0) this.focus(items, items.length - 1);
    }

    select(items: HTMLElement[]) {
        const i = this.#focusedIndex();
        if (i >= 0 && i < items.length) items[i].click();
    }
}
