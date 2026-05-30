import { ClassValue } from "clsx";

import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from "@angular/core";

import { mergeClasses } from "../../core";
import { skeletonVariants } from "./skeleton.variants";

@Component({
    selector: "ai-skeleton",
    exportAs: "aiSkeleton",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <div [class]="classes()">
            <ng-content />
        </div>
    `,
    host: {
        class: "block",
    },
})
export class AiSkeleton {
    readonly class = input<ClassValue>("");

    protected readonly classes = computed(() => mergeClasses(skeletonVariants(), this.class()));
}
