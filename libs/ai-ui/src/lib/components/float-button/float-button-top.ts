import { ClassValue } from "clsx";

import { ChangeDetectionStrategy, Component, computed, input, OnDestroy, OnInit, signal, TemplateRef, ViewEncapsulation } from "@angular/core";

import { mergeClasses } from "../../core";
import { AiIcon } from "../icon/icon.component";
import { AiIconType } from "../icon/icons";
import { FloatButtonVariants, floatButtonVariants } from "./float-button.variants";

@Component({
    selector: "ai-float-button-top",
    exportAs: "aiFloatButtonTop",
    imports: [AiIcon],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <button type="button" [class]="classes()" (click)="scrollToTop()">
            @let nameIcon = icon();
            @if (nameIcon) {
                <ai-icon [icon]="nameIcon" size="sm" type="fill" />
            }
            @if (label()) {
                <span class="pl-2 text-sm font-text">{{ label() }}</span>
            }
        </button>
    `,
    host: {
        "[class]": "visible() ? 'opacity-100' : 'opacity-0 pointer-events-none'",
    },
})
export class AiFloatButtonTop implements OnInit, OnDestroy {
    readonly variant = input<FloatButtonVariants["variant"]>("default");
    readonly size = input<FloatButtonVariants["size"]>("default");
    readonly shape = input<FloatButtonVariants["shape"]>("default");
    readonly icon = input<AiIconType>("arrow-up-long");
    readonly label = input<string | TemplateRef<void>>("");
    readonly class = input<ClassValue>("");
    readonly position = input<"top-left" | "top-right" | "bottom-left" | "bottom-right">("bottom-right");

    private positionMap: Record<NonNullable<ReturnType<typeof this.position>>, string> = {
        "top-left": "top-4 left-4",
        "top-right": "top-4 right-4",
        "bottom-left": "bottom-10 left-4",
        "bottom-right": "bottom-10 right-4",
    };

    protected readonly containerPosition = computed(() => this.positionMap[this.position() as keyof typeof this.positionMap]);

    protected classes = computed(() =>
        mergeClasses(
            "fixed m-4 z-[999] transition-opacity duration-300",
            this.containerPosition(),
            floatButtonVariants({ variant: this.variant(), size: this.size(), shape: this.shape() }),
            this.class(),
        ),
    );

    protected visible = signal<boolean>(false);
    private _checkScroll = () => this.visible.set(window.scrollY > 200);

    ngOnInit() {
        window.addEventListener("scroll", this._checkScroll);
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    ngOnDestroy() {
        window.removeEventListener("scroll", this._checkScroll);
    }
}
