import { NgModule } from "@angular/core";

import { AiIcon } from "../icon/icon.component";
import { AiCarousel } from "./carousel";
import { AiCarouselItem } from "./carousel-item";

const components = [AiCarousel, AiCarouselItem, AiIcon] as const;
export const AiCarouselImports = [...components];

@NgModule({
    imports: [...components],
    exports: [...components],
})
export class AiCarouselModule {}
