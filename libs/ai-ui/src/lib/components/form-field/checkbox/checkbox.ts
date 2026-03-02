import { ClassValue } from "clsx";

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, input, model, output, signal, ViewEncapsulation } from "@angular/core";
import { FormCheckboxControl } from "@angular/forms/signals";

import { ChangeFn, mergeClasses, noopFn, TouchFn } from "../../../core";
import { AiIcon } from "../../icon";
import { checkboxLabelVariants, checkboxVariants, CheckboxVariants } from "./checkbox.variants";

@Component({
    selector: "ai-checkbox, [ai-checkbox]",
    exportAs: "aiCheckbox",
    imports: [AiIcon],
    templateUrl: "./checkbox.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class AiCheckbox implements FormCheckboxControl {
    #cdr = inject(ChangeDetectorRef);

    variant = input<CheckboxVariants["variant"]>("primary");
    size = input<CheckboxVariants["size"]>("default");
    shape = input<CheckboxVariants["shape"]>("default");

    class = input<ClassValue>("");
    id = input<string>("");
    disabled = input<boolean>(false);
    value = undefined;
    touched = model<boolean>(false);
    checked = model<boolean>(false);
    indeterminate = input<boolean>(false);

    changeCheck = output<boolean>();

    protected _change: ChangeFn<boolean> = () => noopFn;
    protected _touched: TouchFn = () => noopFn;

    protected _internalVariant = signal<CheckboxVariants["variant"] | null>(null);

    protected hasError = computed(() => {
        return !this.checked() && this.touched();
    });

    protected effectiveVariant = computed(() => this._internalVariant() ?? this.variant());
    protected classes = computed(() => mergeClasses(checkboxVariants({ variant: this.effectiveVariant(), size: this.size(), shape: this.shape() }), this.class()));
    protected labelClasses = computed(() => mergeClasses(checkboxLabelVariants({ size: this.size(), variant: this.effectiveVariant() }), this.class()));

    constructor() {
        effect(() => this._updateVariant());
    }

    onCheckboxBlur() {
        this._touched();
        this.#cdr.markForCheck();
    }

    onCheckboxChange() {
        if (this.disabled()) return;

        this.checked.set(!this.checked());
        this._change(this.checked() as boolean);
        this.changeCheck.emit(this.checked());
        this.#cdr.markForCheck();
    }

    onKeyboardEvent(event: KeyboardEvent) {
        if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
            this.onCheckboxChange();
        }
    }

    private _updateVariant() {
        this._internalVariant.set(this.hasError() ? "destructive" : null);
    }
}
