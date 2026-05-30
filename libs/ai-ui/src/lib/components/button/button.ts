import { ClassValue } from "clsx";

import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from "@angular/core";

import { mergeClasses, transform } from "../../core";
import { AiIcon } from "../icon/icon.component";
import { AiIconType } from "../icon/icons";
import { buttonVariants, ButtonVariants } from "./button.variants";

@Component({
    selector: "ai-button, button[ai-button], a[ai-button]",
    exportAs: "aiButton",
    imports: [AiIcon],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <ng-content />
        @let nameIcon = icon();
        @if (loading()) {
            <ai-icon [icon]="'loader-4'" size="sm" class="animate-spin" />
        }
        @if (nameIcon) {
            <ai-icon [icon]="nameIcon" size="sm" />
        }
    `,
    host: {
        "[class]": "classes()",
        role: "button",
        "[attr.type]": "type()",
        "[attr.aria-disabled]": "disabled()",
    },
})
export class AiButton {
    readonly variant = input<ButtonVariants["variant"]>("primary");
    readonly size = input<ButtonVariants["size"]>("default");
    readonly shape = input<ButtonVariants["shape"]>("default");
    readonly type = input<"button" | "submit" | "reset">("button");
    readonly fill = input<ButtonVariants["fill"]>("default");

    readonly class = input<ClassValue>("");

    readonly icon = input<AiIconType | undefined>(undefined);
    readonly full = input<boolean, string | boolean>(false, { transform });
    readonly loading = input<boolean, string | boolean>(false, { transform });
    readonly disabled = input<boolean, string | boolean>(false, { transform });

    protected readonly classes = computed(() =>
        mergeClasses(
            buttonVariants({
                variant: this.variant(),
                size: this.size(),
                shape: this.shape(),
                fill: this.fill(),
                full: this.full(),
                loading: this.loading(),
                disabled: this.disabled(),
            }),
            this.class(),
        ),
    );
}
