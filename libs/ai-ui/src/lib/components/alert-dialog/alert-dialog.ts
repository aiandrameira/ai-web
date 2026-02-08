import { A11yModule } from "@angular/cdk/a11y";
import { OverlayModule } from "@angular/cdk/overlay";
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, PortalModule, TemplatePortal } from "@angular/cdk/portal";
import { ChangeDetectionStrategy, Component, ComponentRef, computed, ElementRef, EmbeddedViewRef, inject, output, viewChild, ViewEncapsulation } from "@angular/core";
import { GenerateIdDirective, mergeClasses } from "../../core";
import { AiButton } from "../button";
import { AiIcon } from "../icon/icon.component";
import { AiAlertDialogConfig } from "./alert-dialog.config";
import { AiAlertDialogRef } from "./alert-dialog.ref";
import { alertDialogVariants } from "./alert-dialog.variants";

@Component({
    selector: "ai-alert-dialog",
    exportAs: "aiAlertDialog",
    imports: [AiButton, OverlayModule, PortalModule, A11yModule, GenerateIdDirective, AiIcon],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    templateUrl: "./alert-dialog.html",
    styleUrl: "./alert-dialog.scss",
    host: {
        "[class]": "classes()",
        "[style.width]": "config.width ? config.width : null",
        role: "alertdialog",
        "[attr.aria-modal]": "true",
        "[attr.aria-labelledby]": "titleId()",
        "[attr.aria-describedby]": "descriptionId()",
        "animate.enter": "alert-dialog-enter",
        "animate.leave": "alert-dialog-leave",
    },
})
export class AiAlertDialog<T> extends BasePortalOutlet {
    #host = inject(ElementRef<HTMLElement>);
    protected config = inject(AiAlertDialogConfig<T>);

    protected readonly _id = viewChild<GenerateIdDirective>("ai");

    protected titleId = computed(() => {
        const id = this._id()?.id;
        return this.config.title && id ? `${id}-title` : null;
    });

    protected descriptionId = computed(() => {
        const id = this._id()?.id;
        return this.config.description && id ? `${id}-description` : null;
    });

    protected readonly hasStringContent = computed(() => typeof this.config.component === "string");

    protected classes = computed(() => mergeClasses(alertDialogVariants(), this.config.customClasses));

    public alertDialogRef!: AiAlertDialogRef<T>;

    readonly portalOutlet = viewChild.required(CdkPortalOutlet);

    confirmTriggered = output<void>();
    cancelTriggered = output<void>();

    get element(): HTMLElement {
        return this.#host.nativeElement;
    }

    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
        if (this.portalOutlet()?.hasAttached()) {
            throw new Error("Attempting to attach alert dialog content after content is already attached");
        }
        return this.portalOutlet()?.attachComponentPortal(portal);
    }

    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
        if (this.portalOutlet()?.hasAttached()) {
            throw new Error("Attempting to attach alert dialog content after content is already attached");
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
