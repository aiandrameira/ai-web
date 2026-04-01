import { Injectable, signal } from "@angular/core";

export interface AccordionItemRef {
    close: () => void;
}

@Injectable()
export class AiAccordionService {
    readonly #multi = signal(false);
    #items: AccordionItemRef[] = [];

    configure(options: { multi: boolean }) {
        this.#multi.set(options.multi);
    }

    registerItem(item: AccordionItemRef) {
        this.#items.push(item);
    }

    unregisterItem(item: AccordionItemRef) {
        this.#items = this.#items.filter(i => i !== item);
    }

    closeOthers(except: AccordionItemRef) {
        if (this.#multi()) return;
        this.#items.forEach(item => {
            if (item !== except) item.close();
        });
    }
}
