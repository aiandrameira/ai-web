import { ClassValue } from "class-variance-authority/types";

import { NgOptimizedImage } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, input, TemplateRef, ViewEncapsulation } from "@angular/core";

import { mergeClasses, StringTemplateRefDirective } from "../../core";
import { AiIcon } from "../icon/icon.component";
import { AiIconType } from "../icon/icons";
import { emptyActionsVariants, emptyDescriptionVariants, emptyHeaderVariants, emptyIconVariants, emptyImageVariants, emptyTitleVariants, emptyVariants } from "./empty.variants";

@Component({
    selector: "ai-empty",
    exportAs: "aiEmpty",
    imports: [StringTemplateRefDirective, AiIcon, NgOptimizedImage],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    templateUrl: "./empty.html",
    host: {
        "[class]": "classes()",
    },
})
export class AiEmpty {
    readonly actions = input<TemplateRef<void>[]>([]);
    readonly icon = input<AiIconType>();
    readonly image = input<string | TemplateRef<void>>();
    readonly title = input<string | TemplateRef<void>>();
    readonly description = input<string | TemplateRef<void>>();
    readonly class = input<ClassValue>("");

    protected readonly classes = computed(() => mergeClasses(emptyVariants(), this.class()));
    protected readonly headerClasses = computed(() => emptyHeaderVariants());
    protected readonly imageClasses = computed(() => emptyImageVariants());
    protected readonly iconClasses = computed(() => emptyIconVariants());
    protected readonly titleClasses = computed(() => emptyTitleVariants());
    protected readonly descriptionClasses = computed(() => emptyDescriptionVariants());
    protected readonly actionsClasses = computed(() => emptyActionsVariants());
}
