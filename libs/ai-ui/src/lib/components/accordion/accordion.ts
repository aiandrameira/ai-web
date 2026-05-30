import { ClassValue } from "clsx";

import { ChangeDetectionStrategy, Component, computed, DestroyRef, effect, inject, input, output, signal, ViewEncapsulation } from "@angular/core";

import { mergeClasses, transform } from "../../core";
import { AiIcon } from "../icon";
import { AiIconType } from "../icon/icons";
import { AiAccordionService } from "./accordion.service";
import { accordionContentVariants, accordionHeaderVariants, accordionToggleVariants, accordionVariants } from "./accordion.variants";

@Component({
    selector: "ai-accordion-item",
    exportAs: "aiAccordionItem",
    imports: [AiIcon],
    templateUrl: "./accordion.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: "block",
    },
})
export class AiAccordionItem {
    readonly #service = inject(AiAccordionService);
    readonly #destroyRef = inject(DestroyRef);

    readonly title = input.required<string>();
    readonly description = input("");
    readonly icon = input<AiIconType | undefined>(undefined);
    readonly expanded = input<boolean, string | boolean>(false, { transform });
    readonly disabled = input<boolean, string | boolean>(false, { transform });
    readonly hideToggle = input<boolean, string | boolean>(false, { transform });

    readonly opened = output<void>();
    readonly closed = output<void>();

    readonly #expanded = signal(false);
    readonly isExpanded = this.#expanded.asReadonly();

    constructor() {
        effect(() => this.#expanded.set(this.expanded()), { allowSignalWrites: true });

        this.#service.registerItem(this);
        this.#destroyRef.onDestroy(() => this.#service.unregisterItem(this));
    }

    protected readonly headerClasses = computed(() => mergeClasses(accordionHeaderVariants()));
    protected readonly contentClasses = computed(() => mergeClasses(accordionContentVariants({ expanded: this.isExpanded() })));
    protected readonly toggleClasses = computed(() => mergeClasses(accordionToggleVariants({ expanded: this.isExpanded() })));

    toggle() {
        if (this.disabled()) return;
        const willExpand = !this.#expanded();
        if (willExpand) {
            this.#service.closeOthers(this);
        }
        this.#expanded.set(willExpand);
        if (willExpand) {
            this.opened.emit();
        } else {
            this.closed.emit();
        }
    }

    close() {
        if (this.#expanded()) {
            this.#expanded.set(false);
            this.closed.emit();
        }
    }
}

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
