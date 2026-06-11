import { ClassValue } from "clsx";

import { ChangeDetectionStrategy, Component, computed, input, model, output, ViewEncapsulation } from "@angular/core";
import { FormCheckboxControl } from "@angular/forms/signals";

import { mergeClasses } from "../../../core";
import { switchLabelVariants, switchThumbVariants, switchVariants, SwitchVariants } from "./switch.variants";

@Component({
    selector: "ai-switch",
    exportAs: "aiSwitch",
    templateUrl: "./switch.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class AiSwitch implements FormCheckboxControl {
    readonly id = input<string>("");
    readonly variant = input<SwitchVariants["variant"]>("primary");
    readonly size = input<SwitchVariants["size"]>("default");
    readonly class = input<ClassValue>("");
    readonly disabled = input<boolean>(false);

    readonly checked = model<boolean>(false);
    readonly touched = model<boolean>(false);
    value = undefined;

    readonly changeCheck = output<boolean>();

    protected readonly classes = computed(() => mergeClasses(switchVariants({ variant: this.variant(), size: this.size() }), this.class()));
    protected readonly thumbClasses = computed(() => mergeClasses(switchThumbVariants({ size: this.size() })));
    protected readonly labelClasses = computed(() => mergeClasses(switchLabelVariants({ size: this.size() })));

    onToggle() {
        if (this.disabled()) return;
        this.checked.set(!this.checked());
        this.changeCheck.emit(this.checked());
    }

    onBlur() {
        this.touched.set(true);
    }
}
