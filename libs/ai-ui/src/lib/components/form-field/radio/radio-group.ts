import { ClassValue } from "clsx";

import { ChangeDetectionStrategy, Component, computed, effect, input, model, output, ViewEncapsulation } from "@angular/core";
import { FormValueControl } from "@angular/forms/signals";

import { mergeClasses } from "../../../core";

@Component({
    selector: "ai-radio-group",
    exportAs: "aiRadioGroup",
    template: `<ng-content />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        role: "radiogroup",
        "[class]": "classes()",
    },
})
export class AiRadioGroup<T = unknown> implements FormValueControl<T | null> {
    readonly class = input<ClassValue>("");

    readonly value = model<T | null>(null);
    readonly touched = model<boolean>(false);
    readonly disabled = input<boolean>(false);
    readonly invalid = input<boolean>(false);
    readonly readonly = input<boolean>(false);
    readonly required = input<boolean>(false);

    readonly valueChange = output<T | null>();

    protected readonly classes = computed(() => mergeClasses("flex flex-col gap-2", this.class()));

    constructor() {
        effect(() => {
            this.writeValue(this.value());
        });
    }

    writeValue(value: T | null) {
        this.value.set(value);
    }

    onChange(value: T | null) {
        this.value.set(value);
    }

    onTouched() {
        this.touched.set(true);
    }

    select(value: T) {
        if (this.disabled()) return;
        this.value.set(value);
        this.valueChange.emit(value);
        this.touched.set(true);
    }
}
