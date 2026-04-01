import { Injectable, signal } from "@angular/core";

export interface StepConfig {
    isCompleted: () => boolean;
    editable: () => boolean;
    markCompleted: () => void;
}

@Injectable()
export class AiStepperService {
    readonly #selectedIndex = signal(0);
    readonly selectedIndex = this.#selectedIndex.asReadonly();

    #steps: StepConfig[] = [];
    #linear = false;
    #onChange: ((index: number) => void) | null = null;

    configure(options: { linear: boolean; onChange: (index: number) => void }) {
        this.#linear = options.linear;
        this.#onChange = options.onChange;
    }

    setSteps(steps: StepConfig[]) {
        this.#steps = steps;
    }

    stepState(index: number): "active" | "completed" | "inactive" {
        if (index === this.selectedIndex()) return "active";
        if (this.#steps[index]?.isCompleted()) return "completed";
        return "inactive";
    }

    isStepDisabled(index: number): boolean {
        if (!this.#linear) return false;
        if (index === this.selectedIndex()) return false;

        if (index < this.selectedIndex()) {
            return !this.#steps[index]?.editable();
        }

        for (let i = this.selectedIndex(); i < index; i++) {
            if (!this.#steps[i]?.isCompleted()) return true;
        }
        return false;
    }

    selectStep(index: number) {
        if (this.isStepDisabled(index)) return;
        this.#selectedIndex.set(index);
        this.#onChange?.(index);
    }

    next() {
        const current = this.selectedIndex();
        if (current >= this.#steps.length - 1) return;

        const currentStep = this.#steps[current];
        if (this.#linear && !currentStep?.isCompleted()) {
            currentStep?.markCompleted();
        }

        this.#selectedIndex.set(current + 1);
        this.#onChange?.(current + 1);
    }

    previous() {
        const current = this.selectedIndex();
        if (current <= 0) return;
        this.#selectedIndex.set(current - 1);
        this.#onChange?.(current - 1);
    }
}
