import { ClassValue } from "clsx";

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, forwardRef, inject, Injector, input, OnInit, output, signal, ViewEncapsulation } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from "@angular/forms";

import { ChangeFn, mergeClasses, noopFn, TouchFn } from "../../../core";
import { AiIcon } from "../../icon";
import { checkboxLabelVariants, checkboxVariants, CheckboxVariants } from "./checkbox.variants";

@Component({
    selector: "ai-checkbox, [ai-checkbox]",
    exportAs: "aiCheckbox",
    imports: [AiIcon],
    templateUrl: "./checkbox.html",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AiCheckbox),
            multi: true,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class AiCheckbox<T = unknown> implements ControlValueAccessor, OnInit {
    #cdr = inject(ChangeDetectorRef);
    #injector = inject(Injector);
    #ngControl: NgControl | null = null;
    #controlStateVersion = signal(0);

    variant = input<CheckboxVariants["variant"]>("primary");
    size = input<CheckboxVariants["size"]>("default");
    shape = input<CheckboxVariants["shape"]>("default");

    class = input<ClassValue>("");
    id = input<string>("");
    disabled = signal<boolean>(false);

    changeCheck = output<boolean>();

    protected _change: ChangeFn<T> = () => noopFn;
    protected _touched: TouchFn = () => noopFn;

    protected _internalVariant = signal<CheckboxVariants["variant"] | null>(null);

    protected hasError = computed(() => {
        this.#controlStateVersion();

        if (!this.#ngControl) {
            try {
                this.#ngControl = this.#injector.get(NgControl, null, { optional: true, self: true });
            } catch {
                return false;
            }
        }
        const control = this.#ngControl?.control;
        return control && control.invalid && (control.dirty || control.touched);
    });

    protected effectiveVariant = computed(() => this._internalVariant() ?? this.variant());

    protected classes = computed(() => mergeClasses(checkboxVariants({ variant: this.effectiveVariant(), size: this.size(), shape: this.shape() }), this.class()));

    protected labelClasses = computed(() => mergeClasses(checkboxLabelVariants({ size: this.size() }), this.class()));

    checked = false;

    ngOnInit(): void {
        if (!this.#ngControl) {
            this.#ngControl = this.#injector.get(NgControl, null, { optional: true, self: true });
        }

        if (this.#ngControl?.control) {
            this.#ngControl.control.statusChanges?.subscribe(() => {
                this.#controlStateVersion.update(v => v + 1);
                this._updateVariant();
                this.#cdr.markForCheck();
            });
        }
    }

    writeValue(val: boolean): void {
        this.checked = val;
        this.#cdr.markForCheck();
    }

    registerOnChange(fn: ChangeFn<T>): void {
        this._change = fn;
    }

    registerOnTouched(fn: TouchFn): void {
        this._touched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled.set(isDisabled);
    }

    onCheckboxBlur() {
        this._touched();
        this.#cdr.markForCheck();
    }

    onCheckboxChange() {
        if (this.disabled()) return;

        this.checked = !this.checked;
        this._change(this.checked as boolean as unknown as T);
        this.changeCheck.emit(this.checked);
        this.#cdr.markForCheck();
    }

    onKeyboardEvent(event: KeyboardEvent): void {
        if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
            this.onCheckboxChange();
        }
    }

    private _updateVariant(): void {
        const shouldShowError = this.hasError();
        this._internalVariant.set(shouldShowError ? "destructive" : null);
    }
}
