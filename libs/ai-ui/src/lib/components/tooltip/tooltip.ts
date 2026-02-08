import { ChangeDetectionStrategy, Component, computed, signal, viewChild, ViewEncapsulation } from "@angular/core";
import { GenerateIdDirective, mergeClasses, StringTemplateRefDirective } from "../../core";
import { AiTooltipType } from "./tooltip.config";
import { TooltipPositionVariants, tooltipPositionVariants, tooltipVariants } from "./tooltip.variants";

@Component({
    selector: "ai-tooltip",
    exportAs: "aiTooltip",
    imports: [GenerateIdDirective, StringTemplateRefDirective],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./tooltip.html",
    host: {
        "[class]": "classes()",
        "[attr.id]": "tooltipId()",
        "[attr.data-side]": "position()",
        "[attr.data-state]": "state()",
        role: "tooltip",
    },
})
export class AiTooltip {
    readonly position = signal<TooltipPositionVariants>("top");

    protected readonly classes = computed(() => mergeClasses(tooltipVariants()));
    protected readonly arrowClasses = computed(() => mergeClasses(tooltipPositionVariants({ position: this.position() })));

    readonly state = signal<"opened" | "closed">("closed");
    readonly uniqueId = viewChild<GenerateIdDirective>("ai");

    protected tooltipLabel = signal<AiTooltipType>(null);
    protected tooltipId = computed(() => this.uniqueId()?.id() ?? "tooltip");

    setLabel(tooltipLabel: AiTooltipType, position: TooltipPositionVariants) {
        if (tooltipLabel) {
            this.tooltipLabel.set(tooltipLabel);
        }
        this.position.set(position);
    }
}
