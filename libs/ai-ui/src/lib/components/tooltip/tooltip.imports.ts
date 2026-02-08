import { OverlayModule } from "@angular/cdk/overlay";
import { AiTooltip } from "./tooltip";
import { AiTooltipDirective } from "./tooltip.directive";

export const AiTooltipImports = [AiTooltip, AiTooltipDirective, OverlayModule] as const;
