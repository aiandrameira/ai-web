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
    styles: `
        @keyframes ai-progress-indeterminate {
            0% {
                left: -50%;
                width: 50%;
            }
            100% {
                left: 100%;
                width: 50%;
            }
        }
        @keyframes ai-progress-spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        ai-progress-bar .ai-bar-indeterminate {
            animation: ai-progress-indeterminate 1.5s ease-in-out infinite;
        }
        ai-progress-bar .ai-circle-indeterminate {
            animation: ai-progress-spin 1.5s linear infinite;
            transform-origin: center;
        }
    `,
    host: {
        role: "progressbar",
        "[attr.aria-valuenow]": "normalizedProgress()",
        "[attr.aria-valuemin]": "0",
        "[attr.aria-valuemax]": "100",
        "[class]": "hostClasses()",
    },
    template: `
        @if (shape() === "circle") {
            <svg class="transform -rotate-90" [attr.viewBox]="'0 0 ' + svgSize() + ' ' + svgSize()">
                <circle
                    class="text-muted"
                    [attr.cx]="svgCenter()"
                    [attr.cy]="svgCenter()"
                    [attr.r]="svgRadius()"
                    fill="none"
                    [attr.stroke-width]="strokeWidth()"
                    stroke="currentColor"
                />
                <circle
                    [class]="fillStrokeClass()"
                    [attr.cx]="svgCenter()"
                    [attr.cy]="svgCenter()"
                    [attr.r]="svgRadius()"
                    fill="none"
                    [attr.stroke-width]="strokeWidth()"
                    stroke="currentColor"
                    stroke-linecap="round"
                    [attr.stroke-dasharray]="circumference()"
                    [attr.stroke-dashoffset]="dashOffset()"
                    [class.ai-circle-indeterminate]="indeterminate()"
                />
            </svg>
            @if (showLabel()) {
                <span class="absolute text-sm font-medium">{{ normalizedProgress() }}%</span>
            }
        } @else {
            <div [class]="fillClasses()" [style.width.%]="indeterminate() ? null : normalizedProgress()"></div>
            @if (showLabel() && !indeterminate()) {
                <span class="absolute inset-0 flex items-center justify-center text-xs font-medium">{{ normalizedProgress() }}%</span>
            }
        }
    `,
})
export class AiProgressBar {
    readonly variant = input<ProgressBarVariant>("primary");
    readonly size = input<ProgressBarSize>("normal");
    readonly shape = input<ProgressBarShape>("normal");
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
        const sizes = { sm: 64, normal: 96, lg: 128 };
        return sizes[this.size()!] ?? 96;
    });

    protected readonly strokeWidth = computed(() => {
        const widths = { sm: 4, normal: 6, lg: 8 };
        return widths[this.size()!] ?? 6;
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
        return variantMap[this.variant()!] ?? "text-primary";
    });
}
