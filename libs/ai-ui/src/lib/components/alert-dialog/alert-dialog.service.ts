import { ComponentType, Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal, TemplatePortal } from "@angular/cdk/portal";
import { isPlatformBrowser } from "@angular/common";
import { inject, Injectable, InjectionToken, Injector, PLATFORM_ID, TemplateRef, ViewContainerRef } from "@angular/core";
import { AiAlertDialog } from "./alert-dialog";
import { AiAlertDialogConfig } from "./alert-dialog.config";
import { AiAlertDialogRef } from "./alert-dialog.ref";

type ContentType<T> = ComponentType<T> | TemplateRef<T> | string | undefined;

export const AI_ALERT_DIALOG_DATA = new InjectionToken<unknown>("AI_ALERT_DIALOG_DATA");

@Injectable({
    providedIn: "root",
})
export class AiAlertDialogService {
    #overlay = inject(Overlay);
    #injector = inject(Injector);
    #platform = inject<string>(PLATFORM_ID);

    create<T>(config: AiAlertDialogConfig<T>): AiAlertDialogRef<T> {
        return this._open<T>(config.component, config);
    }

    confirm<T>(config: Omit<AiAlertDialogConfig<T>, "confirmText" | "cancelText"> & { confirmText?: string; cancelText?: string }): AiAlertDialogRef<T> {
        const confirmConfig: AiAlertDialogConfig<T> = {
            ...config,
            confirmText: config.confirmText ?? "Confirmar",
            cancelText: config.cancelText ?? "Cancelar",
            confirmDestructive: config.confirmDestructive ?? false,
        };
        return this.create(confirmConfig);
    }

    private _open<T>(contentType: ContentType<T>, config: AiAlertDialogConfig<T>): AiAlertDialogRef<T> {
        const overlayRef = this._createOverlay();

        if (!overlayRef) {
            return new AiAlertDialogRef(undefined as unknown as OverlayRef, config, undefined as unknown as AiAlertDialog<T>);
        }

        const alertDialogContainer = this._attachAlertDialogContainer<T>(overlayRef, config);
        const alertDialogRef = this._attachAlertDialogContent<T>(contentType, alertDialogContainer, overlayRef, config);
        alertDialogContainer.alertDialogRef = alertDialogRef;

        return alertDialogRef;
    }

    private _createOverlay(): OverlayRef | undefined {
        if (!isPlatformBrowser(this.#platform)) return undefined;

        const overlayConfig = new OverlayConfig({
            hasBackdrop: true,
            backdropClass: "cdk-overlay-dark-backdrop",
            positionStrategy: this.#overlay.position().global(),
        });

        return this.#overlay.create(overlayConfig);
    }

    private _attachAlertDialogContainer<T>(overlayRef: OverlayRef, config: AiAlertDialogConfig<T>) {
        const injector = Injector.create({
            parent: this.#injector,
            providers: [
                { provide: OverlayRef, useValue: overlayRef },
                { provide: AiAlertDialogConfig, useValue: config },
            ],
        });

        const containerPortal = new ComponentPortal<AiAlertDialog<T>>(AiAlertDialog, config.viewContainerRef, injector);
        const containerRef = overlayRef.attach(containerPortal);

        return containerRef.instance;
    }

    private _attachAlertDialogContent<T>(contentType: ContentType<T>, component: AiAlertDialog<T>, overlayRef: OverlayRef, config: AiAlertDialogConfig<T>) {
        const alertDialogRef = new AiAlertDialogRef<T>(overlayRef, config, component);

        if (contentType instanceof TemplateRef) {
            component.attachTemplatePortal(new TemplatePortal<T>(contentType, null as unknown as ViewContainerRef, { alertDialogRef } as T));
        } else if (contentType && typeof contentType !== "string") {
            const injector = this._createInjector(alertDialogRef, config);
            const contentRef = component.attachComponentPortal(new ComponentPortal(contentType, config.viewContainerRef, injector));
            alertDialogRef.componentInstance = contentRef.instance;
        }

        return alertDialogRef;
    }

    private _createInjector<T>(alertDialogRef: AiAlertDialogRef<T>, config: AiAlertDialogConfig<T>): Injector {
        return Injector.create({
            parent: this.#injector,
            providers: [
                { provide: AiAlertDialogRef, useValue: alertDialogRef },
                { provide: AI_ALERT_DIALOG_DATA, useValue: config.data },
            ],
        });
    }
}
