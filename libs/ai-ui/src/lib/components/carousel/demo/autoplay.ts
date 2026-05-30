import { Component } from "@angular/core";

import { AiCarousel, AiCarouselItem } from "../carousel";

@Component({
    imports: [AiCarousel, AiCarouselItem],
    template: `
        <div class="w-full max-w-md mx-auto">
            <ai-carousel autoplay [autoplayInterval]="3000" loop>
                @for (slide of slides; track slide.id) {
                    <ai-carousel-item>
                        <div class="flex items-center justify-center h-52 rounded-lg" [class]="slide.bg">
                            <span class="text-2xl font-semibold" [class]="slide.textColor">{{ slide.label }}</span>
                        </div>
                    </ai-carousel-item>
                }
            </ai-carousel>
        </div>
    `,
})
export class DemoCarouselAutoplayComponent {
    slides = [
        { id: 1, label: "Promoção 1", bg: "bg-primary", textColor: "text-primary-foreground" },
        { id: 2, label: "Promoção 2", bg: "bg-accent", textColor: "text-accent-foreground" },
        { id: 3, label: "Promoção 3", bg: "bg-success", textColor: "text-success-foreground" },
    ];
}
