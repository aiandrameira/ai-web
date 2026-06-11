import { ClassValue } from "clsx";

import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from "@angular/core";

import { mergeClasses } from "../../core";
import { carouselItemVariants, CarouselVariants } from "./carousel.variants";

@Component({
    selector: "ai-carousel-item",
    exportAs: "aiCarouselItem",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `<ng-content />`,
    host: {
        "[class]": "classes()",
    },
})
export class AiCarouselItem {
    readonly orientation = input<CarouselVariants["orientation"]>("horizontal");
    readonly class = input<ClassValue>("");

    protected readonly classes = computed(() => mergeClasses(carouselItemVariants({ orientation: this.orientation() }), "px-2", this.class()));
}
