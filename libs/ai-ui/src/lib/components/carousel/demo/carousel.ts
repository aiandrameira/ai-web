import { DemoCarouselAutoplayComponent } from "./autoplay";
import { DemoCarouselDefaultComponent } from "./default";
import { DemoCarouselLoopComponent } from "./loop";

export const CAROUSEL = {
    componentName: "carousel",
    componentType: "carousel",
    examples: [
        { name: "default", component: DemoCarouselDefaultComponent },
        { name: "autoplay", component: DemoCarouselAutoplayComponent },
        { name: "loop", component: DemoCarouselLoopComponent },
    ],
};
