import { ClassValue } from "clsx";

import { NgClass } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from "@angular/core";

import { mergeClasses, transform } from "../../core";
import { iconVariants, IconVariants } from "./icon.variants";
import { AI_ICON_NO_TYPE, AiIconType } from "./icons";

const AI_ICON_NO_TYPE_SET = new Set(AI_ICON_NO_TYPE);

@Component({
    selector: "ai-icon, [ai-icon]",
    exportAs: "aiIcon",
    imports: [NgClass],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: ` <i [ngClass]="[iconClass(), classes(), disabled() ? 'opacity-50 cursor-not-allowed' : '']"></i> `,
})
export class AiIcon {
    readonly icon = input.required<AiIconType | "">();
    readonly size = input<IconVariants["size"]>("default");
    readonly type = input<IconVariants["type"]>("line");

    readonly disabled = input<boolean, string | boolean>(false, { transform });
    readonly class = input<ClassValue>("");

    protected readonly iconClass = computed(() => {
        const iconName = this.icon();
        const iconType = this.type();

        if (!iconName) return "";

        if (iconName.endsWith("-line") || iconName.endsWith("-fill") || AI_ICON_NO_TYPE_SET.has(iconName as any)) {
            return `ri-${iconName}`;
        }

        return `ri-${iconName}-${iconType}`;
    });

    protected readonly classes = computed(() => mergeClasses(iconVariants({ size: this.size(), type: this.type() }), this.class()));
}
