import { Injectable } from "@angular/core";

export interface AiSelectKeyboardContext {
    items: HTMLElement[];
    focusedIndex: number;
    onNavigate: (index: number) => void;
    onSelect: (index: number) => void;
    onClose: () => void;
    onFocusFirst: () => void;
    onFocusLast: () => void;
    onFocusButton: () => void;
}

@Injectable()
export class AiSelectKeyboardService {
    handleDropdownKeydown(event: KeyboardEvent, context: AiSelectKeyboardContext) {
        const { key } = event;

        switch (key) {
            case "ArrowDown":
                event.preventDefault();
                this._navigate(1, context);
                break;
            case "ArrowUp":
                event.preventDefault();
                this._navigate(-1, context);
                break;
            case "Enter":
            case " ":
                event.preventDefault();
                context.onSelect(context.focusedIndex);
                break;
            case "Escape":
                event.preventDefault();
                context.onClose();
                context.onFocusButton();
                break;
            case "Home":
                event.preventDefault();
                context.onFocusFirst();
                break;
            case "End":
                event.preventDefault();
                context.onFocusLast();
                break;
        }
    }

    private _navigate(direction: number, context: AiSelectKeyboardContext) {
        const { items, focusedIndex, onNavigate } = context;
        if (items.length === 0) return;

        let nextIndex = focusedIndex + direction;
        if (nextIndex < 0) {
            nextIndex = items.length - 1;
        } else if (nextIndex >= items.length) {
            nextIndex = 0;
        }
        onNavigate(nextIndex);
    }
}
