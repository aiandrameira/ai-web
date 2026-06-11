import { ClassValue } from "clsx";

import { NgTemplateOutlet } from "@angular/common";
import { AfterContentInit, ChangeDetectionStrategy, Component, computed, contentChildren, inject, input, output, ViewEncapsulation } from "@angular/core";

import { mergeClasses, transform } from "../../core";
import { AiIcon } from "../icon";
import { AiStep } from "./step";
import { AiStepperService } from "./stepper.service";
import { stepCircleVariants, stepConnectorVariants, stepLabelVariants, stepperHeaderVariants, stepperVariants, StepperVariants } from "./stepper.variants";

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

    readonly orientation = input<StepperVariants["orientation"]>("horizontal");
    readonly linear = input<boolean, string | boolean>(false, { transform });
    readonly class = input<ClassValue>("");

    readonly steps = contentChildren(AiStep);

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
