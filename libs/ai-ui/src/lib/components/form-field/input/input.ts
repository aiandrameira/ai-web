import { ClassValue } from "clsx";
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";

import { AiIcon } from "@ai-ui/components/icon";
import { NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, effect, inject, input, model, output, signal, ViewEncapsulation } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FormValueControl } from "@angular/forms/signals";

import { AiNormalizeConfig, AiNormalizeDirective, AiNormalizeType, mergeClasses } from "../../../core";
import { AiButton } from "../../button";
import { AiIconType } from "../../icon/icons";
import { AiCurrencyMaskService } from "./currency-mask.service";
import { inputVariants, InputVariants, labelVariants } from "./input.variants";
import { feedbackErrors, IFeedback } from "./interfaces/feedback.interface";
import { AiMaskConfig } from "./interfaces/mask-config.interface";
import { buildStrengthRules } from "./interfaces/password-strength";

import type { ValidationError } from "@angular/forms/signals";
type InputType = "text" | "email" | "number" | "password";

@Component({
    selector: "ai-input",
    exportAs: "aiInput",
    imports: [FormsModule, AiNormalizeDirective, NgxMaskDirective, NgTemplateOutlet, AiButton, AiIcon],
    providers: [provideNgxMask()],
    templateUrl: "./input.html",
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiInput implements FormValueControl<string | number | null> {
    #currencyMaskService = inject(AiCurrencyMaskService);

    readonly id = input<string>("");
    readonly label = input.required<string>();
    readonly placeholder = input<string>("");
    readonly type = input<InputType>("text");
    readonly variant = input<InputVariants["variant"]>("outlined");
    readonly icon = input<AiIconType>();
    readonly class = input<ClassValue>("");

    readonly value = model<string | number | null>(null);
    readonly touched = model<boolean>(false);
    readonly disabled = input<boolean>(false);
    readonly invalid = input<boolean>(false);
    readonly readonly = input<boolean>(false);
    readonly required = input<boolean>(false);
    readonly maxlength = input<string | number>("");
    readonly minlength = input<string | number>("");
    readonly errors = input<readonly ValidationError.WithOptionalField[]>([]);

    readonly strength = input<boolean>(false);

    readonly mask = input<string>("");
    readonly maskConfig = input<AiMaskConfig | null>(null);

    readonly normalize = input<AiNormalizeType>();
    readonly normalizeConfig = input<AiNormalizeConfig | undefined>();

    changeIcon = output<void>();

    protected hasError = computed(() => this.touched() && this.invalid());
    protected errorMessages = computed(() => feedbackErrors(this.errors(), { minlength: this.minlength() }));
    protected regexs = computed(() => buildStrengthRules(this.strength(), this.type(), this.value(), this.minlength()));
    protected shouldShowStrength = computed(() => this.regexs().some(rule => !rule.passed));
    protected readonly feedback = computed<IFeedback>(() => ({
        error: this.hasError(),
        errorMessages: this.errorMessages(),
        strengthRules: this.regexs(),
        strength: this.shouldShowStrength(),
    }));

    protected hide = signal<boolean>(false);
    protected labelVariant = signal<InputVariants["variant"]>("outlined");

    protected readonly inputClass = computed(() => {
        const paddingClass = this.icon() || this.type() === "password" ? "pr-12" : "";
        return mergeClasses(inputVariants({ variant: this.variant(), error: this.feedback().error, disabled: this.disabled() }), paddingClass);
    });

    protected readonly labelClass = computed(() => mergeClasses(labelVariants({ variant: this.labelVariant(), error: this.feedback().error, disabled: this.disabled() })));

    protected readonly filledClass = computed(() => {
        const paddingClass = this.icon() || this.type() === "password" ? "pr-12" : "";
        return mergeClasses(inputVariants({ variant: "filled", error: this.feedback().error, disabled: this.disabled() }), paddingClass);
    });

    protected readonly filledLabelClass = computed(() => mergeClasses(labelVariants({ variant: "filled", error: this.feedback().error, disabled: this.disabled() })));

    protected readonly standardLabelClass = computed(() => mergeClasses(labelVariants({ variant: "standard", error: this.feedback().error, disabled: this.disabled() })));

    constructor() {
        effect(() => {
            this.writeValue(this.value());
        });
    }

    writeValue(value: string | number | null) {
        const config = this.maskConfig();

        if (config?.isCurrency && value !== null) {
            const formatted = this.#currencyMaskService.format(value as string, config);
            this.value.set(formatted);
        } else {
            this.value.set(value);
        }
    }

    onChange(event: Event) {
        const config = this.maskConfig();
        const rawValue = (event.target as HTMLInputElement).value;

        if (config?.isCurrency) {
            const cleanedValue = this.#currencyMaskService.clean(rawValue, config);
            this.value.set(cleanedValue);

            const formattedValue = this.#currencyMaskService.format(cleanedValue, config);
            this.value.set(formattedValue);
        } else {
            this.value.set(rawValue);
        }
    }

    onToggleHide() {
        this.hide.update(value => !value);
    }

    onBlur() {
        this.touched.set(true);
    }
}
