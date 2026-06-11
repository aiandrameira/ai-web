import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { NgModule } from "@angular/core";

import { AiButton } from "../button";
import { AiDialog } from "./dialog";
import { AiDialogService } from "./dialog.service";

const components = [AiButton, AiDialog, OverlayModule, PortalModule] as const;
export const AiDialogImports = [...components] as const;

@NgModule({
    imports: [...components],
    exports: [...components],
    providers: [AiDialogService],
})
export class AiDialogModule {}
