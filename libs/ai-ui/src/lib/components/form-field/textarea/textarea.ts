import { ClassValue } from "clsx";

import { NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, input, model, signal, ViewEncapsulation } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FormValueControl } from "@angular/forms/signals";

import { mergeClasses } from "../../../core";
import { AiIcon } from "../../icon/icon.component";
import { feedbackErrors, IFeedback } from "../input/interfaces/feedback.interface";
import { textareaLabelVariants, textareaVariants, TextareaVariants } from "./textarea.variants";

import type { ValidationError } from "@angular/forms/signals";

@Component({
    selector: "ai-textarea",
    exportAs: "aiTextarea",
    imports: [FormsModule, NgTemplateOutlet, AiIcon],
    templateUrl: "./textarea.html",
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiTextarea implements FormValueControl<string | null> {
    readonly id = input<string>("");
    readonly label = input.required<string>();
    readonly placeholder = input<string>("");
    readonly variant = input<TextareaVariants["variant"]>("outlined");
    readonly class = input<ClassValue>("");

    readonly value = model<string | null>(null);
    readonly touched = model<boolean>(false);
    readonly disabled = input<boolean>(false);
    readonly invalid = input<boolean>(false);
    readonly readonly = input<boolean>(false);
    readonly required = input<boolean>(false);
    readonly maxlength = input<string | number>("");
    readonly minlength = input<string | number>("");
    readonly rows = input<number>(4);
    readonly resize = input<TextareaVariants["resize"]>("none");
    readonly errors = input<readonly ValidationError.WithOptionalField[]>([]);

    protected hasError = computed(() => this.touched() && this.invalid());
    protected errorMessages = computed(() => feedbackErrors(this.errors(), { minlength: this.minlength() }));
    protected charCount = computed(() => (this.value() ?? "").toString().length);
    protected readonly feedback = computed<IFeedback>(() => ({
        error: this.hasError(),
        errorMessages: this.errorMessages(),
        strengthRules: [],
        strength: false,
    }));

    protected labelVariant = signal<TextareaVariants["variant"]>("outlined");
    protected readonly inputClass = computed(() => {
        return mergeClasses(textareaVariants({ variant: this.variant(), error: this.feedback().error, disabled: this.disabled(), resize: this.resize() }));
    });
    protected readonly labelClass = computed(() => mergeClasses(textareaLabelVariants({ variant: this.labelVariant(), error: this.feedback().error, disabled: this.disabled() })));
    protected readonly filledClass = computed(() => {
        return mergeClasses(textareaVariants({ variant: "filled", error: this.feedback().error, disabled: this.disabled(), resize: this.resize() }));
    });
    protected readonly filledLabelClass = computed(() => mergeClasses(textareaLabelVariants({ variant: "filled", error: this.feedback().error, disabled: this.disabled() })));
    protected readonly standardLabelClass = computed(() => mergeClasses(textareaLabelVariants({ variant: "standard", error: this.feedback().error, disabled: this.disabled() })));

    writeValue(value: string | null) {
        this.value.set(value);
    }

    onBlur() {
        this.touched.set(true);
    }
}
