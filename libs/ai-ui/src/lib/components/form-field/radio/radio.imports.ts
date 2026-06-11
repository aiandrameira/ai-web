import { NgModule } from "@angular/core";

import { AiRadio } from "./radio";
import { AiRadioGroup } from "./radio-group";

const components = [AiRadioGroup, AiRadio] as const;
export const AiRadioImports = [...components];

@NgModule({
    imports: [...components],
    exports: [...components],
})
export class AiRadioModule {}
