import { ClassValue } from "clsx";

import { AfterContentInit, ChangeDetectionStrategy, Component, computed, contentChildren, ElementRef, inject, input, OnInit, output, ViewEncapsulation } from "@angular/core";

import { mergeClasses, transform } from "../../core";
import { AiIcon } from "../icon";
import { AiCarouselItem } from "./carousel-item";
import { AiCarouselService } from "./carousel.service";
import { carouselDotVariants, carouselNavVariants, carouselTrackVariants, carouselVariants, CarouselVariants } from "./carousel.variants";

@Component({
    selector: "ai-carousel",
    exportAs: "aiCarousel",
    imports: [AiIcon],
    templateUrl: "./carousel.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [AiCarouselService],
    host: {
        role: "region",
        "aria-roledescription": "carousel",
        "[class]": "containerClasses()",
    },
})
export class AiCarousel implements OnInit, AfterContentInit {
    readonly #el = inject(ElementRef);
    readonly #service = inject(AiCarouselService);

    readonly items = contentChildren(AiCarouselItem);

    readonly orientation = input<CarouselVariants["orientation"]>("horizontal");
    readonly loop = input<boolean, string | boolean>(false, { transform });
    readonly autoplay = input<boolean, string | boolean>(false, { transform });
    readonly autoplayInterval = input<number>(4000);
    readonly showDots = input<boolean, string | boolean>(true, { transform });
    readonly showNav = input<boolean, string | boolean>(true, { transform });
    readonly class = input<ClassValue>("");

    readonly slideChange = output<number>();

    readonly current = computed(() => this.#service.current());
    readonly dragging = computed(() => this.#service.dragging());
    readonly total = computed(() => this.items().length);
    readonly canPrev = computed(() => this.#service.canPrev());
    readonly canNext = computed(() => this.#service.canNext());

    protected readonly containerClasses = computed(() => mergeClasses("flex items-center gap-2", this.class()));
    protected readonly viewportClasses = computed(() => mergeClasses(carouselVariants({ orientation: this.orientation() })));
    protected readonly trackClasses = computed(() => mergeClasses(carouselTrackVariants({ orientation: this.orientation(), dragging: this.dragging() })));
    protected readonly trackTransform = computed(() => {
        const offset = -(this.current() * 100) + this.#service.dragOffset();
        return this.orientation() === "horizontal" ? `translateX(${offset}%)` : `translateY(${offset}%)`;
    });

    protected navClasses = mergeClasses(carouselNavVariants());

    protected dotClasses(index: number) {
        return mergeClasses(carouselDotVariants({ active: index === this.current() }));
    }

    protected dots = computed(() => Array.from({ length: this.total() }, (_, i) => i));

    ngOnInit() {
        this.#service.configure({
            total: this.items().length,
            loop: this.loop(),
            autoplay: this.autoplay(),
            autoplayInterval: this.autoplayInterval(),
            orientation: this.orientation() ?? "horizontal",
            onChange: index => this.slideChange.emit(index),
        });

        this.#service.setupDrag(this.#el);
    }

    ngAfterContentInit() {
        this.#service.configure({
            total: this.items().length,
            loop: this.loop(),
            autoplay: this.autoplay(),
            autoplayInterval: this.autoplayInterval(),
            orientation: this.orientation() ?? "horizontal",
            onChange: index => this.slideChange.emit(index),
        });

        this.#service.startAutoplay();
    }

    prev() {
        this.#service.prev();
    }

    next() {
        this.#service.next();
    }

    goTo(index: number) {
        this.#service.goTo(index);
    }
}
