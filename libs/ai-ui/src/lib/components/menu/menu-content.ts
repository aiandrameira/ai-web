import { ClassValue } from "clsx";

import { Component, computed, input, TemplateRef, viewChild, ViewEncapsulation } from "@angular/core";

import { mergeClasses } from "../../core";
import { menuContentVariants } from "./menu.variants";

@Component({
    selector: "ai-menu-content",
    exportAs: "aiMenuContent",
    encapsulation: ViewEncapsulation.None,
    template: `
        <ng-template #contentTemplate>
            <div [class]="classes()" role="menu" tabindex="-1" [attr.aria-orientation]="'vertical'">
                <ng-content />
            </div>
        </ng-template>
    `,
})
export class AiMenuContent {
    contentTemplate = viewChild.required<TemplateRef<unknown>>("contentTemplate");

    readonly class = input<ClassValue>("");

    protected classes = computed(() => mergeClasses(menuContentVariants(), this.class()));
}
