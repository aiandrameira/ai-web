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

    /**
     * Abre um Alert Dialog com base na configuração fornecida.
     * @param config AiAlertDialogConfig<T>
     * @returns AiAlertDialogRef<T>
     */
    create<T>(config: AiAlertDialogConfig<T>): AiAlertDialogRef<T> {
        return this._open<T>(config.component, config);
    }

    /**
     * Abre um Alert Dialog de confirmação com base na configuração fornecida. Os textos dos botões de confirmação e cancelamento podem ser personalizados, mas
     * por padrão serão "Confirmar" e "Cancelar", respectivamente.
     * @param config Omit<AiAlertDialogConfig<T>, "confirmText" | "cancelText"> & { confirmText?: string; cancelText?: string }
     * @returns AiAlertDialogRef<T>
     */
    confirm<T>(config: Omit<AiAlertDialogConfig<T>, "confirmText" | "cancelText"> & { confirmText?: string; cancelText?: string }): AiAlertDialogRef<T> {
        const confirmConfig: AiAlertDialogConfig<T> = {
            ...config,
            confirmText: config.confirmText ?? "Confirmar",
            cancelText: config.cancelText ?? "Cancelar",
            confirmDestructive: config.confirmDestructive ?? false,
        };
        return this.create(confirmConfig);
    }

    /**
     * Abre um Alert Dialog com base no tipo de conteúdo e na configuração fornecida.
     * @param contentType ContentType<T>
     * @param config AiAlertDialogConfig<T>
     * @returns AiAlertDialogRef<T>
     */
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

    /**
     * Cria um OverlayRef para o Alert Dialog. Retorna undefined se não estiver em um ambiente de navegador.
     * @returns OverlayRef | undefined
     */
    private _createOverlay(): OverlayRef | undefined {
        if (!isPlatformBrowser(this.#platform)) return undefined;

        const overlayConfig = new OverlayConfig({
            hasBackdrop: true,
            backdropClass: "cdk-overlay-dark-backdrop",
            positionStrategy: this.#overlay.position().global(),
        });

        return this.#overlay.create(overlayConfig);
    }

    /**
     * Anexa o container do Alert Dialog ao OverlayRef.
     * @param overlayRef OverlayRef
     * @param config AiAlertDialogConfig<T>
     * @returns AiAlertDialog<T>
     */
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

    /**
     * Anexa o conteúdo do Alert Dialog (componente ou template) ao container do Alert Dialog.
     * @param contentType ContentType<T>
     * @param component AiAlertDialog<T>
     * @param overlayRef OverlayRef
     * @param config AiAlertDialogConfig<T>
     * @returns AiAlertDialogRef<T>
     */
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

    /**
     * Cria um Injector personalizado para o conteúdo do Alert Dialog, fornecendo o AiAlertDialogRef e os dados de configuração.
     * @param alertDialogRef AiAlertDialogRef<T>
     * @param config AiAlertDialogConfig<T>
     * @returns Injector
     */
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
