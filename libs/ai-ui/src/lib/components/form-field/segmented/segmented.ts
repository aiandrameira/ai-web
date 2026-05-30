import { ClassValue } from "clsx";

import { ChangeDetectionStrategy, Component, computed, effect, input, model, output, ViewEncapsulation } from "@angular/core";
import { FormValueControl } from "@angular/forms/signals";

import { mergeClasses } from "../../../core";
import { AiIcon } from "../../icon/icon.component";
import { AiSegmentedItem } from "./segmented.interface";
import { segmentedItemVariants, segmentedVariants, SegmentedVariants } from "./segmented.variants";

@Component({
    selector: "ai-segmented",
    exportAs: "aiSegmented",
    imports: [AiIcon],
    templateUrl: "./segmented.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        "[class]": "'inline-block'",
    },
})
export class AiSegmented implements FormValueControl<string> {
    readonly items = input<AiSegmentedItem[]>([]);
    readonly size = input<SegmentedVariants["size"]>("normal");
    readonly class = input<ClassValue>("");
    readonly defaultValue = input<string>("");

    readonly value = model<string>("");
    readonly touched = model<boolean>(false);
    readonly disabled = input<boolean>(false);
    readonly invalid = input<boolean>(false);
    readonly readonly = input<boolean>(false);
    readonly required = input<boolean>(false);

    readonly valueChange = output<string>();

    protected readonly containerClasses = computed(() => mergeClasses(segmentedVariants(), this.class()));
    protected readonly itemClasses = computed(() => mergeClasses(segmentedItemVariants({ size: this.size() })));

    constructor() {
        effect(() => {
            const defaultVal = this.defaultValue();
            if (defaultVal && !this.value()) {
                this.writeValue(defaultVal);
            }
        });
    }

    protected isActive(itemValue: string): boolean {
        return this.value() === itemValue;
    }

    protected onSelect(item: AiSegmentedItem) {
        if (this.disabled() || item.disabled) return;
        this.value.set(item.value);
        this.valueChange.emit(item.value);
        this.touched.set(true);
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
}
