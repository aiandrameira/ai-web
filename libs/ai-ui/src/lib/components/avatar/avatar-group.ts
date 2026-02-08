import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from "@angular/core";
import { ClassValue } from "clsx";
import { mergeClasses } from "../../core";
import { avatarGroupVariants, AvatarGroupVariants } from "./avatar.variants";

@Component({
    selector: "ai-avatar-group",
    exportAs: "aiAvatarGroup",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: ` <ng-content /> `,
    host: {
        "[class]": "classes()",
    },
})
export class AiAvatarGroup {
    readonly orientation = input<AvatarGroupVariants["orientation"]>("horizontal");
    readonly class = input<ClassValue>("");

    protected readonly classes = computed(() => mergeClasses(avatarGroupVariants({ orientation: this.orientation() }), this.class()));
}
