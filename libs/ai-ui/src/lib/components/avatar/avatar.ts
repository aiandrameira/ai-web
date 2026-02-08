import { NgOptimizedImage } from "@angular/common";
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, effect, input, signal, ViewEncapsulation } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";
import { mergeClasses } from "../../core";
import { avatarVariants, AvatarVariants, imageVariants } from "./avatar.variants";

export type AiAvatarStatus = "online" | "invisible" | "doNotDisturb" | "away";

@Component({
    selector: "ai-avatar",
    exportAs: "aiAvatar",
    imports: [NgOptimizedImage],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    templateUrl: "./avatar.html",
    host: {
        "[class]": "containerClasses()",
        "[style.width]": "customSize()",
        "[style.height]": "customSize()",
        "[attr.data-slot]": '"avatar"',
        "[attr.data-status]": "status() ?? null",
    },
})
export class AiAvatar {
    readonly alt = input<string>("");
    readonly fallback = input<string>("");
    readonly priority = input(false, { transform: booleanAttribute });
    readonly size = input<AvatarVariants["size"] | number>("default");
    readonly shape = input<AvatarVariants["shape"]>("circle");
    readonly image = input<string | SafeUrl>("");
    readonly status = input<AiAvatarStatus>();

    readonly class = input<string>("");

    protected readonly imageError = signal<boolean>(false);
    protected readonly imageLoaded = signal<boolean>(false);

    protected readonly containerClasses = computed(() => {
        const size = this.size();
        const sizeClass = typeof size === "number" ? undefined : (size as AvatarVariants["size"]);
        return mergeClasses(avatarVariants({ shape: this.shape(), size: sizeClass }), this.class());
    });

    protected readonly customSize = computed(() => (typeof this.size() === "number" ? `${this.size()}px` : null));
    protected readonly imgClasses = computed(() => mergeClasses(imageVariants({ shape: this.shape() })));

    constructor() {
        effect(() => {
            this.image();
            this.imageError.set(false);
            this.imageLoaded.set(false);
        });
    }

    protected onImageError() {
        this.imageError.set(true);
        this.imageLoaded.set(false);
    }

    protected onImageLoad() {
        this.imageLoaded.set(true);
        this.imageError.set(false);
    }
}
