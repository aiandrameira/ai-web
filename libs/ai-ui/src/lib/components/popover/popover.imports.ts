import { NgModule } from "@angular/core";

import { AiPopover } from "./popover";
import { AiPopoverDirective } from "./popover.directive";

const components = [AiPopover, AiPopoverDirective] as const;
export const AiPopoverImports = [...components] as const;

@NgModule({
    imports: [...components],
    exports: [...components],
})
export class AiPopoverModule {}
