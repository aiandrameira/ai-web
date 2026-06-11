import { ClassValue } from "clsx";

import { BooleanInput } from "@angular/cdk/coercion";
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from "@angular/core";

import { mergeClasses } from "../../core";
import { progressBarCircleVariants, progressBarFillVariants, ProgressBarShape, ProgressBarSize, ProgressBarVariant, progressBarVariants } from "./progress-bar.variants";

@Component({
    selector: "ai-progress-bar",
    exportAs: "aiProgressBar",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    templateUrl: "./progress-bar.html",
    styleUrl: "./progress-bar.scss",
    host: {
        role: "progressbar",
        "[attr.aria-valuenow]": "normalizedProgress()",
        "[attr.aria-valuemin]": "0",
        "[attr.aria-valuemax]": "100",
        "[class]": "hostClasses()",
    },
})
export class AiProgressBar {
    readonly variant = input<ProgressBarVariant>("primary");
    readonly size = input<ProgressBarSize>("default");
    readonly shape = input<ProgressBarShape>("default");
    readonly indeterminate = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
    readonly showLabel = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
    readonly progress = input<number>(0);
    readonly class = input<ClassValue>("");
    readonly barClass = input<ClassValue>("");

    protected readonly normalizedProgress = computed(() => Math.max(0, Math.min(100, this.progress())));

    protected readonly hostClasses = computed(() => {
        if (this.shape() === "circle") {
            return mergeClasses(progressBarCircleVariants({ size: this.size() }), this.class());
        }
        return mergeClasses(progressBarVariants({ size: this.size() }), this.class());
    });

    protected readonly fillClasses = computed(() => {
        const widthStyle = this.indeterminate() ? "w-1/2" : "";
        return mergeClasses(progressBarFillVariants({ variant: this.variant(), indeterminate: this.indeterminate() }), widthStyle, this.barClass());
    });

    protected readonly fillStyle = computed(() => {
        if (this.indeterminate()) return {};
        return { width: `${this.normalizedProgress()}%` };
    });

    protected readonly svgSize = computed(() => {
        const sizes = { sm: 64, default: 96, lg: 128 };
        return sizes[this.size()] ?? 96;
    });

    protected readonly strokeWidth = computed(() => {
        const widths = { sm: 4, default: 6, lg: 8 };
        return widths[this.size()] ?? 6;
    });

    protected readonly svgCenter = computed(() => this.svgSize() / 2);
    protected readonly svgRadius = computed(() => (this.svgSize() - this.strokeWidth()) / 2);
    protected readonly circumference = computed(() => 2 * Math.PI * this.svgRadius());

    protected readonly dashOffset = computed(() => {
        if (this.indeterminate()) return this.circumference() * 0.75;
        return this.circumference() - (this.normalizedProgress() / 100) * this.circumference();
    });

    protected readonly fillStrokeClass = computed(() => {
        const variantMap = { primary: "text-primary", accent: "text-accent" };
        return variantMap[this.variant()] ?? "text-primary";
    });
}
