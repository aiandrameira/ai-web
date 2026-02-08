import { ClassValue } from "clsx";

import { BooleanInput } from "@angular/cdk/coercion";
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, forwardRef, input, output, signal, ViewEncapsulation } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import { ChangeFn, mergeClasses, TouchFn } from "../../core";
import { AiIcon } from "../icon";
import { AiIconType } from "../icon/icons";
import { buttonToggleItemVariants, ButtonToggleVariants, buttonToggleVariants } from "./button-toggle.variants";

export interface AiButtonToggleItem {
    value: string;
    label?: string;
    icon?: AiIconType;
    disabled?: boolean;
}

@Component({
    selector: "ai-button-toggle",
    exportAs: "aiButtonToggle",
    templateUrl: "./button-toggle.html",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AiButtonToggle),
            multi: true,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [AiIcon],
})
export class AiButtonToggle<T = unknown> implements ControlValueAccessor {
    variant = input<ButtonToggleVariants["variant"]>("outline");
    size = input<ButtonToggleVariants["size"]>("default");
    mode = input<"single" | "multiple">("multiple");

    class = input<ClassValue>("");

    value = input<string | string[]>("");
    defaultValue = input<string | string[]>("");
    disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
    items = input<AiButtonToggleItem[]>([]);

    changeValue = output<string | string[]>();

    _value = signal<string | string[] | undefined>(undefined);

    protected _change: ChangeFn<T> = () => void 0;
    protected _touched: TouchFn = () => void 0;

    protected classes = computed(() => mergeClasses(buttonToggleVariants({ variant: this.variant(), size: this.size() }), this.class()));

    protected current = computed(() => {
        const value = this._value();
        const input = this.value();
        const defaultValue = this.defaultValue();

        if (value !== undefined) return value;
        if (input) return input;
        if (defaultValue) return defaultValue;

        return this.mode() === "single" ? "" : [];
    });

    protected getItemClasses(i: number, total: number) {
        const classes = buttonToggleItemVariants({ variant: this.variant(), size: this.size() });

        const position = [];

        if (i === 0) position.push("first:rounded-l-md");
        if (i === total - 1) position.push("last:rounded-r-md");

        if (this.variant() === "outline") {
            if (i === 0) position.push("border-l");
            else position.push("border-l-0");
        }

        position.push("focus:z-10", "focus-visible:z-10");
        return mergeClasses(classes, ...position);
    }

    protected isItemPressed(item: string): boolean {
        const current = this.current();

        if (this.mode() === "single") return current === item;
        return Array.isArray(current) && (current as string[]).includes(item);
    }

    writeValue(val: string | string[]): void {
        if (!val) return;
        this._value.set(val);
    }

    registerOnChange(fn: ChangeFn<T>): void {
        this._change = fn;
    }

    registerOnTouched(fn: TouchFn): void {
        this._touched = fn;
    }

    onToggleChange(item: AiButtonToggleItem) {
        if (this.disabled() || item.disabled) return;

        const current = this.current();
        let newValue: string | string[];

        if (this.mode() === "single") {
            newValue = current === item.value ? "" : item.value;
        } else {
            const list = Array.isArray(current) ? current : [];
            newValue = list.includes(item.value) ? list.filter(v => v !== item.value) : [...list, item.value];
        }

        this._value.set(newValue);
        this.changeValue.emit(newValue);
        this._change(newValue as unknown as T);
        this._touched();
    }
}
