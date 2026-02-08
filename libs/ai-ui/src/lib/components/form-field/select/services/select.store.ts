import { Injectable, signal } from "@angular/core";

@Injectable()
export class AiSelectStore {
    readonly isOpen = signal(false);
    readonly focusedIndex = signal(-1);
    readonly isFocus = signal(false);
    readonly isCompact = signal(false);

    open() {
        this.isOpen.set(true);
    }

    close() {
        this.isOpen.set(false);
        this.focusedIndex.set(-1);
    }

    focus(index: number) {
        this.focusedIndex.set(index);
    }

    setFocusState(isFocused: boolean) {
        this.isFocus.set(isFocused);
    }

    setCompact(isCompact: boolean) {
        this.isCompact.set(isCompact);
    }
}
