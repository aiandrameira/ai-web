import { ChangeDetectionStrategy, Component, computed, input, linkedSignal, output, TemplateRef, ViewEncapsulation } from "@angular/core";
import { ClassValue } from "clsx";
import { mergeClasses } from "../../core";
import { AiIcon } from "../icon/icon.component";
import { AiIconType } from "../icon/icons";
import { FloatButtonVariants, floatButtonVariants } from "./float-button.variants";

@Component({
    selector: "ai-float-button-group",
    exportAs: "aiFloatButtonGroup",
    imports: [AiIcon],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="flex items-center justify-center" [class]="containerClasses()" (mouseenter)="onHover(true)" (mouseleave)="onHover(false)">
            <button type="button" [class]="classes()" (click)="onToggle()">
                @let nameIcon = icon(); @if (nameIcon) {
                <ai-icon [icon]="opened() ? 'close' : nameIcon" size="sm" type="fill" />
                } @if (label()) {
                <span class="pl-2 text-sm">{{ label() }}</span>
                }
            </button>

            @if (opened()) {
            <div class="absolute flex gap-2 transition-all duration-400" [class]="childrenClasses()">
                <ng-content />
            </div>
            }
        </div>
    `,
})
export class AiFloatButtonGroup {
    readonly variant = input<FloatButtonVariants["variant"]>("default");
    readonly size = input<FloatButtonVariants["size"]>("default");
    readonly shape = input<FloatButtonVariants["shape"]>("default");
    readonly icon = input<AiIconType>();
    readonly label = input<string | TemplateRef<void>>("");
    readonly trigger = input<"click" | "hover">("click");
    readonly position = input<"top-center" | "top-right" | "bottom-center" | "bottom-left" | "bottom-right" | null>(null);
    readonly childrenPosition = input<"left" | "top">("top");

    readonly open = input<boolean | null>(null);
    readonly changeOpen = output<boolean>();

    readonly class = input<ClassValue>("");

    private positionMap: Record<NonNullable<ReturnType<typeof this.position>>, string> = {
        "top-center": "fixed top-4 left-1/2 -translate-x-1/2 z-[999]",
        "top-right": "fixed top-4 right-8 z-[999]",
        "bottom-center": "fixed bottom-8 left-1/2 -translate-x-1/2 z-[999]",
        "bottom-left": "fixed bottom-8 left-8 z-[999]",
        "bottom-right": "fixed bottom-8 right-8 z-[999]",
    };

    protected containerClasses = computed(() => {
        if (!this.position()) return "relative";
        return this.positionMap[this.position() as keyof typeof this.positionMap];
    });

    private childrenPositionMap: Record<NonNullable<ReturnType<typeof this.childrenPosition>>, string> = {
        left: "right-full flex-row mr-2",
        top: "bottom-full flex-col mb-2 items-center",
    };

    protected childrenClasses = computed(() => this.childrenPositionMap[this.childrenPosition() as keyof typeof this.childrenPositionMap]);

    protected classes = computed(() => mergeClasses(floatButtonVariants({ variant: this.variant(), size: this.size(), shape: this.shape() }), this.class()));
    readonly opened = linkedSignal<boolean>(() => !!this.open());

    onToggle() {
        if (this.trigger() === "click") {
            this.opened.set(!this.opened());
            this.changeOpen.emit(this.opened());
        }
    }

    onHover(state: boolean) {
        if (this.trigger() === "hover") {
            this.opened.set(state);
            this.changeOpen.emit(this.opened());
        }
    }
}
