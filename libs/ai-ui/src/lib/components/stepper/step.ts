import { ChangeDetectionStrategy, Component, computed, forwardRef, inject, input, signal, TemplateRef, viewChild, ViewEncapsulation } from "@angular/core";

import { transform } from "../../core";
import { AiStepper } from "./stepper";

@Component({
    selector: "ai-step",
    exportAs: "aiStep",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <ng-template>
            <ng-content />
        </ng-template>
    `,
    host: {
        style: "display: none",
    },
})
export class AiStep {
    readonly #stepper = inject(forwardRef(() => AiStepper));

    readonly label = input.required<string>();
    readonly optional = input<boolean, string | boolean>(false, { transform });
    readonly completed = input<boolean, string | boolean>(false, { transform });
    readonly editable = input<boolean, string | boolean>(true, { transform });

    readonly content = viewChild.required(TemplateRef);

    readonly #completed = signal(false);
    readonly isCompleted = computed(() => this.completed() || this.#completed());

    readonly index = computed(() => {
        const steps = this.#stepper.steps();
        return steps ? steps.indexOf(this) : -1;
    });

    readonly active = computed(() => this.index() === this.#stepper.selectedIndex());

    markCompleted() {
        this.#completed.set(true);
    }
}
