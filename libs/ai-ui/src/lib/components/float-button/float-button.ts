import { ChangeDetectionStrategy, Component, computed, input, TemplateRef, ViewEncapsulation } from "@angular/core";
import { ClassValue } from "clsx";
import { mergeClasses } from "../../core";
import { AiIcon } from "../icon/icon.component";
import { AiIconType } from "../icon/icons";
import { FloatButtonVariants, floatButtonVariants } from "./float-button.variants";

@Component({
    selector: "ai-float-button, button[ai-float-button], a[ai-float-button]",
    exportAs: "aiFloatButton",
    imports: [AiIcon],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        @let nameIcon = icon();
        @if (nameIcon) {
            <ai-icon [icon]="nameIcon" />
        }
        @if (label()) {
            <span class="pl-2 text-sm">{{ label() }}</span>
        }

        <ng-content />
    `,
    host: {
        "[class]": "classes()",
    },
})
export class AiFloatButton {
    readonly variant = input<FloatButtonVariants["variant"]>("default");
    readonly size = input<FloatButtonVariants["size"]>("default");
    readonly shape = input<FloatButtonVariants["shape"]>("default");
    readonly icon = input<AiIconType>();
    readonly label = input<string | TemplateRef<void>>("");
    readonly class = input<ClassValue>("");
    readonly position = input<"top-left" | "top-right" | "bottom-left" | "bottom-right" | null>(null);

    private positionMap: Record<NonNullable<ReturnType<typeof this.position>>, string> = {
        "top-left": "fixed top-4 left-4 z-[999]",
        "top-right": "fixed top-4 right-4 z-[999]",
        "bottom-left": "fixed bottom-8 left-4 z-[999]",
        "bottom-right": "fixed bottom-8 right-8 z-[999]",
    };

    protected readonly containerPosition = computed(() => this.positionMap[this.position() as keyof typeof this.positionMap]);

    protected readonly classes = computed(() =>
        mergeClasses(floatButtonVariants({ variant: this.variant(), size: this.size(), shape: this.shape() }), this.position() ? this.containerPosition() : "", this.class()),
    );
}
