import { NgModule } from "@angular/core";

import { AiAccordion } from "./accordion";
import { AiAccordionItem } from "./accordion-item";

const components = [AiAccordion, AiAccordionItem] as const;
export const AiAccordionImports = [...components];

@NgModule({
    imports: [...components],
    exports: [...components],
})
export class AiAccordionModule {}
