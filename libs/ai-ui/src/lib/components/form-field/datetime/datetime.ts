import { ClassValue } from "clsx";

import { ChangeDetectionStrategy, Component, computed, effect, input, model, output, ViewEncapsulation } from "@angular/core";
import { FormValueControl, ValidationError } from "@angular/forms/signals";

import { mergeClasses } from "../../../core";
import { AiIcon } from "../../icon/icon.component";
import { datetimeLabelVariants, datetimeVariants } from "./datetime.variants";

export type AiDatetimeType = "date" | "time" | "month" | "datetime-local";

@Component({
    selector: "ai-datetime",
    exportAs: "aiDatetime",
    imports: [AiIcon],
    templateUrl: "./datetime.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrl: "./datetime.scss",
})
export class AiDatetime implements FormValueControl<string> {
    readonly id = input<string>("");
    readonly label = input<string>("");
    readonly type = input<AiDatetimeType>("date");
    readonly minDate = input<string>("");
    readonly maxDate = input<string>("");
    readonly class = input<ClassValue>("");

    readonly value = model<string>("");
    readonly touched = model<boolean>(false);
    readonly disabled = input<boolean>(false);
    readonly invalid = input<boolean>(false);
    readonly readonly = input<boolean>(false);
    readonly required = input<boolean>(false);
    readonly errors = input<readonly ValidationError.WithOptionalField[]>([]);

    readonly valueChange = output<string>();

    protected readonly hasError = computed(() => this.touched() && this.invalid());

    protected readonly errorMessages = computed(() => {
        const errors = this.errors();
        if (!errors || errors.length === 0) return [];
        return errors.filter(e => e.message).map(e => e.message as string);
    });

    protected readonly inputClasses = computed(() => mergeClasses(datetimeVariants({ error: this.hasError(), disabled: this.disabled() }), this.class()));

    protected readonly labelClasses = computed(() => mergeClasses(datetimeLabelVariants({ error: this.hasError(), disabled: this.disabled() })));

    constructor() {
        effect(() => {
            this.writeValue(this.value());
        });
    }

    writeValue(value: string) {
        this.value.set(value ?? "");
    }

    onChange(value: string) {
        this.value.set(value);
    }

    onTouched() {
        this.touched.set(true);
    }

    protected onInput(event: Event) {
        const val = (event.target as HTMLInputElement).value;
        this.value.set(val);
        this.valueChange.emit(val);
    }

    protected onBlur() {
        this.touched.set(true);
    }
}
