import { ChangeDetectionStrategy, Component, computed, input, output, ViewEncapsulation } from "@angular/core";
import { ClassValue } from "clsx";
import { mergeClasses, transform } from "../../core";
import { AiIcon } from "../icon/icon.component";
import { AiIconType } from "../icon/icons";
import { badgeVariants, BadgeVariants } from "./badge.variants";

@Component({
    selector: "ai-badge",
    exportAs: "aiBadge",
    imports: [AiIcon],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        @let nameIcon = icon(); @if (nameIcon) {
        <ai-icon [icon]="nameIcon" size="sm" />
        }
        <ng-content />

        @if (variant() === "default" && close()) {
        <button class="h-4 cursor-pointer" (click)="closed.emit()">
            <ai-icon [icon]="'close-circle'" size="sm" />
        </button>
        }
    `,
    host: {
        "[class]": "classes()",
    },
})
export class AiBadge {
    readonly variant = input<BadgeVariants["variant"]>("primary");
    readonly shape = input<BadgeVariants["shape"]>("circle");
    readonly fill = input<BadgeVariants["fill"]>("default");
    readonly icon = input<AiIconType | undefined>(undefined);

    readonly disabled = input<boolean, string | boolean>(false, { transform });
    readonly close = input<boolean, string | boolean>(false, { transform });
    readonly class = input<ClassValue>("");

    readonly closed = output<void>();

    protected classes = computed(() => mergeClasses(badgeVariants({ variant: this.variant(), fill: this.fill(), shape: this.shape(), disabled: this.disabled() }), this.class()));
}
