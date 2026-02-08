import { BooleanInput } from "@angular/cdk/coercion";
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, TemplateRef, ViewEncapsulation } from "@angular/core";
import { ClassValue } from "clsx";
import { mergeClasses, StringTemplateRefDirective } from "../../core";
import { AiIcon } from "../icon/icon.component";
import { AiIconType } from "../icon/icons";
import { cardBodyVariants, cardHeaderVariants, cardVariants } from "./card.variants";

@Component({
    selector: "ai-card",
    exportAs: "aiCard",
    imports: [StringTemplateRefDirective, AiIcon],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    templateUrl: "./card.html",
    host: {
        "[class]": "classes()",
    },
})
export class AiCard {
    readonly title = input<string | TemplateRef<void>>();
    readonly description = input<string | TemplateRef<void>>();
    readonly icon = input<AiIconType>();
    readonly routerLink = input<string | null>("");

    readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

    readonly class = input<ClassValue>("");

    protected readonly classes = computed(() => mergeClasses(cardVariants({ disabled: this.disabled() }), this.class()));
    protected readonly headerClasses = computed(() => mergeClasses(cardHeaderVariants()));
    protected readonly bodyClasses = computed(() => mergeClasses(cardBodyVariants()));
}
