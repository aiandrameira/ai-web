import { NgModule } from "@angular/core";

import { AiTab } from "./tabs";
import { AiTabsGroup } from "./tabs-group";

const components = [AiTabsGroup, AiTab] as const;
export const AiTabsImports = [...components];

@NgModule({
    imports: [...components],
    exports: [...components],
})
export class AiTabsModule {}
