import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from "@angular/core";
import { ClassValue } from "clsx";
import { mergeClasses } from "../../core";
import { AiIcon } from "../icon/icon.component";
import { AiIconType } from "../icon/icons";
import { alertVariants, AlertVariants } from "./alert.variants";

@Component({
    selector: "ai-alert",
    exportAs: "aiAlert",
    imports: [AiIcon],
    templateUrl: "./alert.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        "[class]": "classes()",
        "[attr.data-type]": "variant()",
        "[attr.data-appearance]": "appearance()",
    },
})
export class AiAlert {
    readonly title = input.required<string>();
    readonly description = input<string>("");
    readonly icon = input<AiIconType>();
    readonly variant = input<AlertVariants["variant"]>("primary");
    readonly appearance = input<AlertVariants["appearance"]>("outline");
    readonly class = input<ClassValue>("");

    protected classes = computed(() => mergeClasses(alertVariants({ variant: this.variant(), appearance: this.appearance() }), this.class()));
}
