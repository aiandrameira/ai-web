```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";

import { AiCarouselImports } from "../carousel.imports";

@Component({
    selector: "ai-demo-carousel-loop",
    imports: [AiCarouselImports],
    template: `
        <div class="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
            <ai-carousel loop>
                @for (slide of slides; track slide.id) {
                    <ai-carousel-item>
                        <div class="flex items-center justify-center h-52 rounded-lg bg-muted">
                            <span class="text-2xl font-semibold text-muted-foreground">{{ slide.label }}</span>
                        </div>
                    </ai-carousel-item>
                }
            </ai-carousel>
        </div>
    `,
})
export class DemoCarouselLoopComponent {
    slides = [
        { id: 1, label: "Slide 1" },
        { id: 2, label: "Slide 2" },
        { id: 3, label: "Slide 3" },
    ];
}
```
