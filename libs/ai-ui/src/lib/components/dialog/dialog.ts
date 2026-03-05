import { OverlayModule } from "@angular/cdk/overlay";
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, PortalModule, TemplatePortal } from "@angular/cdk/portal";
import { ChangeDetectionStrategy, Component, ComponentRef, computed, ElementRef, EmbeddedViewRef, inject, output, viewChild, ViewEncapsulation } from "@angular/core";

import { mergeClasses } from "../../core";
import { AiButton } from "../button";
import { AiIcon } from "../icon/icon.component";
import { AiDialogRef } from "./dialog-ref";
import { AiDialogConfig } from "./dialog.config";
import { dialogVariants } from "./dialog.variants";

@Component({
    selector: "ai-dialog",
    exportAs: "aiDialog",
    imports: [OverlayModule, PortalModule, AiButton, AiIcon],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./dialog.html",
    styleUrl: "./dialog.scss",
    host: {
        "[class]": "classes()",
        "[style.width]": "config.width ? config.width : null",
        "animate.enter": "dialog-enter",
        "animate.leave": "dialog-leave",
    },
})
export class AiDialog<T, U> extends BasePortalOutlet {
    #element = inject(ElementRef<HTMLElement>);
    protected readonly config = inject(AiDialogConfig<T, U>);

    protected classes = computed(() => mergeClasses(dialogVariants(), this.config.customClasses));

    dialogRef?: AiDialogRef<T>;

    protected readonly hasStringContent = typeof this.config.component === "string";
    readonly portalOutlet = viewChild.required(CdkPortalOutlet);

    confirmTriggered = output<void>();
    cancelTriggered = output<void>();

    nativeElement = (): HTMLElement => this.#element.nativeElement;

    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
        if (this.portalOutlet()?.hasAttached()) {
            throw new Error("Attempting to attach modal content after content is already attached");
        }
        return this.portalOutlet()?.attachComponentPortal(portal);
    }

    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
        if (this.portalOutlet()?.hasAttached()) {
            throw new Error("Attempting to attach modal content after content is already attached");
        }
        return this.portalOutlet()?.attachTemplatePortal(portal);
    }

    onConfirm() {
        this.confirmTriggered.emit();
    }

    onCancel() {
        this.cancelTriggered.emit();
    }
}
