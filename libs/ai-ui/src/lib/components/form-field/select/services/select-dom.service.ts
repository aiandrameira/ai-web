import { ElementRef, Injectable } from "@angular/core";

@Injectable()
export class AiSelectDomService {
    getSelectItems(overlayElement: HTMLElement | undefined, ignoreFilter = false): HTMLElement[] {
        if (!overlayElement) return [];

        return Array.from(overlayElement.querySelectorAll<HTMLElement>("ai-select-item, [ai-select-item]")).filter(item => ignoreFilter || item.dataset["disabled"] === undefined);
    }

    updateItemFocus(items: HTMLElement[], focusedIndex: number) {
        for (let index = 0; index < items.length; index++) {
            const item = items[index];
            if (index === focusedIndex) {
                item.focus();
                item.setAttribute("aria-selected", "true");
                item.setAttribute("data-selected", "true");
            } else {
                item.removeAttribute("aria-selected");
                item.removeAttribute("data-selected");
            }
        }
    }

    focusDropdown(overlayElement: HTMLElement | undefined) {
        if (!overlayElement) return;

        const element = overlayElement.querySelector('[role="listbox"]') as HTMLElement | null;
        if (!element) return;
        element.focus();
    }

    focusButton(elementRef: ElementRef<HTMLElement>) {
        const button = elementRef.nativeElement.querySelector("button");
        if (!button) return;
        button.focus();
    }
}
