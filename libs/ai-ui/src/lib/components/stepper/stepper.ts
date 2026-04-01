import { ClassValue } from "clsx";

import { NgTemplateOutlet } from "@angular/common";
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChildren,
    forwardRef,
    inject,
    input,
    output,
    signal,
    TemplateRef,
    viewChild,
    ViewEncapsulation,
} from "@angular/core";

import { mergeClasses, transform } from "../../core";
import { AiIcon } from "../icon";
import { AiStepperService } from "./stepper.service";
import { stepCircleVariants, stepConnectorVariants, stepLabelVariants, stepperHeaderVariants, stepperVariants, StepperVariants } from "./stepper.variants";

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

@Component({
    selector: "ai-stepper",
    exportAs: "aiStepper",
    imports: [AiIcon, NgTemplateOutlet],
    templateUrl: "./stepper.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [AiStepperService],
    host: {
        "[class]": "classes()",
    },
})
export class AiStepper implements AfterContentInit {
    readonly #service = inject(AiStepperService);

    readonly steps = contentChildren(AiStep);

    readonly orientation = input<StepperVariants["orientation"]>("horizontal");
    readonly linear = input<boolean, string | boolean>(false, { transform });
    readonly class = input<ClassValue>("");

    readonly selectionChange = output<number>();

    readonly selectedIndex = computed(() => this.#service.selectedIndex());

    protected readonly classes = computed(() => mergeClasses(stepperVariants({ orientation: this.orientation() }), this.class()));
    protected readonly headerClasses = computed(() => mergeClasses(stepperHeaderVariants({ orientation: this.orientation() })));

    ngAfterContentInit() {
        this.#service.configure({
            linear: this.linear(),
            onChange: index => this.selectionChange.emit(index),
        });
        this._setSteps();
    }

    protected circleClasses = (i: number) => mergeClasses(stepCircleVariants({ state: this.#service.stepState(i) }));
    protected labelClasses = (i: number) => mergeClasses(stepLabelVariants({ state: this.#service.stepState(i) }));
    protected connectorClasses = (i: number) => mergeClasses(stepConnectorVariants({ completed: this.steps()[i]?.isCompleted() ?? false, orientation: this.orientation() }));
    protected isStepDisabled = (i: number): boolean => this.#service.isStepDisabled(i);
    protected selectStep = (i: number) => this.#service.selectStep(i);

    next() {
        this.#service.next();
    }

    previous() {
        this.#service.previous();
    }

    private _setSteps() {
        this.#service.setSteps(
            this.steps().map(step => ({
                isCompleted: () => step.isCompleted(),
                editable: () => step.editable(),
                markCompleted: () => step.markCompleted(),
            })),
        );
    }
}
