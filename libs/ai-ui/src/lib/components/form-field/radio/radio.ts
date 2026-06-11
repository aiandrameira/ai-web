import { ClassValue } from "clsx";

import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from "@angular/core";

import { mergeClasses } from "../../../core";
import { AiRadioGroup } from "./radio-group";
import { radioLabelVariants, radioVariants, RadioVariants } from "./radio.variants";

@Component({
    selector: "ai-radio",
    exportAs: "aiRadio",
    template: `
        <label class="inline-flex items-center gap-2" [class]="isDisabled() ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'">
            <span class="relative inline-flex items-center justify-center">
                <input
                    type="radio"
                    [class]="classes()"
                    [checked]="isChecked()"
                    [disabled]="isDisabled()"
                    [attr.data-checked]="isChecked() ? '' : null"
                    (change)="onSelect()"
                    (blur)="onBlur()"
                />
                @if (isChecked()) {
                    <span [class]="dotClasses()"></span>
                }
            </span>
            <span [class]="labelClasses()">
                <ng-content />
            </span>
        </label>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class AiRadio<T = unknown> {
    readonly #group = inject(AiRadioGroup, { optional: true });

    readonly value = input.required<T>();
    readonly variant = input<RadioVariants["variant"]>("primary");
    readonly size = input<RadioVariants["size"]>("default");
    readonly disabled = input<boolean>(false);
    readonly class = input<ClassValue>("");

    protected readonly isChecked = computed(() => this.#group?.value() === this.value());
    protected readonly isDisabled = computed(() => this.disabled() || (this.#group?.disabled() ?? false));
    protected readonly isInvalid = computed(() => (this.#group?.invalid() ?? false) && (this.#group?.touched() ?? false));

    protected readonly classes = computed(() =>
        mergeClasses(radioVariants({ variant: this.variant(), size: this.size() }), this.isInvalid() && "border-destructive", this.class()),
    );

    protected readonly labelClasses = computed(() => mergeClasses(radioLabelVariants({ size: this.size() }), this.isInvalid() && "text-destructive"));

    protected readonly dotClasses = computed(() => {
        const sizeClass = this.size() === "lg" ? "size-2" : "size-1.5";
        return mergeClasses("absolute rounded-full bg-primary-foreground pointer-events-none", sizeClass);
    });

    onSelect() {
        if (this.isDisabled()) return;
        this.#group?.select(this.value());
    }

    onBlur() {
        this.#group?.onTouched();
    }
}
