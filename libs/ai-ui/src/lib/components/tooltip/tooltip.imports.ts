import { OverlayModule } from "@angular/cdk/overlay";
import { NgModule } from "@angular/core";

import { AiTooltip } from "./tooltip";
import { AiTooltipDirective } from "./tooltip.directive";

const components = [AiTooltip, AiTooltipDirective] as const;
export const AiTooltipImports = [...components, OverlayModule] as const;

@NgModule({
    imports: [...components, OverlayModule],
    exports: [...components, OverlayModule],
})
export class AiTooltipModule {}
