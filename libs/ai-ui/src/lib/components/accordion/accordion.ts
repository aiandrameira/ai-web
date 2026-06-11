import { ClassValue } from "clsx";

import { ChangeDetectionStrategy, Component, computed, effect, inject, input, ViewEncapsulation } from "@angular/core";

import { mergeClasses, transform } from "../../core";
import { AiAccordionService } from "./accordion.service";
import { accordionVariants } from "./accordion.variants";

@Component({
    selector: "ai-accordion",
    exportAs: "aiAccordion",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [AiAccordionService],
    template: `<ng-content />`,
    host: {
        "[class]": "classes()",
    },
})
export class AiAccordion {
    readonly #service = inject(AiAccordionService);

    readonly multi = input<boolean, string | boolean>(false, { transform });
    readonly class = input<ClassValue>("");

    protected readonly classes = computed(() => mergeClasses(accordionVariants(), this.class()));

    constructor() {
        effect(() => this.#service.configure({ multi: this.multi() }));
    }
}
