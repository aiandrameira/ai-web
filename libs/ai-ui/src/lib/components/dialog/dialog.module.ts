import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { NgModule } from "@angular/core";
import { AiButton } from "../button";
import { AiDialog } from "./dialog";
import { AiDialogService } from "./dialog.service";

@NgModule({
    imports: [AiButton, AiDialog, OverlayModule, PortalModule],
    providers: [AiDialogService],
})
export class AiDialogModule {}
