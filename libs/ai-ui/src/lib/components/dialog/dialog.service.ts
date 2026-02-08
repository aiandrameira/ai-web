import { ComponentType, Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal, TemplatePortal } from "@angular/cdk/portal";
import { isPlatformBrowser } from "@angular/common";
import { inject, Injectable, InjectionToken, Injector, PLATFORM_ID, TemplateRef, ViewContainerRef } from "@angular/core";
import { AiDialog } from "./dialog";
import { AiDialogRef } from "./dialog-ref";
import { AiDialogConfig } from "./dialog.config";

type ContentType<T> = ComponentType<T> | TemplateRef<T> | string;

export const AI_DIALOG_DATA = new InjectionToken<unknown>("AI_DIALOG_DATA");

@Injectable({
    providedIn: "root",
})
export class AiDialogService {
    #overlay = inject(Overlay);
    #injector = inject(Injector);
    #platformId = inject(PLATFORM_ID);

    create<T, U>(config: AiDialogConfig<T, U>): AiDialogRef<T> {
        return this._open<T, U>(config.component as ComponentType<T>, config);
    }

    private _open<T, U>(contentType: ContentType<T>, config: AiDialogConfig<T, U>) {
        const overlayRef = this._createOverlay();

        if (!overlayRef) {
            return new AiDialogRef(undefined as unknown as OverlayRef, config, undefined as unknown as AiDialog<T, U>, this.#platformId);
        }

        const dialogContainer = this._attachDialogContainer<T, U>(overlayRef, config);
        const dialogRef = this._attachDialogContent<T, U>(contentType, dialogContainer, overlayRef, config);

        dialogContainer.dialogRef = dialogRef;
        return dialogRef;
    }

    private _createOverlay(): OverlayRef | undefined {
        if (isPlatformBrowser(this.#platformId)) {
            const overlayConfig = new OverlayConfig({ hasBackdrop: true, positionStrategy: this.#overlay.position().global() });
            return this.#overlay.create(overlayConfig);
        }

        return undefined;
    }

    private _attachDialogContainer<T, U>(overlayRef: OverlayRef, config: AiDialogConfig<T, U>) {
        const injector = Injector.create({
            parent: this.#injector,
            providers: [
                { provide: OverlayRef, useValue: overlayRef },
                { provide: AiDialogConfig, useValue: config },
            ],
        });

        const containerPortal = new ComponentPortal<AiDialog<T, U>>(AiDialog, config.viewContainerRef, injector);
        const containerRef = overlayRef.attach<AiDialog<T, U>>(containerPortal);
        return containerRef.instance;
    }

    private _attachDialogContent<T, U>(contentType: ContentType<T>, component: AiDialog<T, U>, overlayRef: OverlayRef, config: AiDialogConfig<T, U>) {
        const dialogRef = new AiDialogRef<T>(overlayRef, config, component, this.#platformId);

        if (contentType instanceof TemplateRef) {
            component.attachTemplatePortal(new TemplatePortal<T>(contentType, null as unknown as ViewContainerRef, { dialogRef } as T));
        } else if (typeof contentType !== "string") {
            const injector = this._createInjector<T, U>(dialogRef, config);
            const contentRef = component.attachComponentPortal<T>(new ComponentPortal(contentType, config.viewContainerRef, injector));
            dialogRef.componentInstance = contentRef.instance;
        }

        return dialogRef;
    }

    private _createInjector<T, U>(dialogRef: AiDialogRef<T>, config: AiDialogConfig<T, U>) {
        return Injector.create({
            parent: this.#injector,
            providers: [
                { provide: AiDialogRef, useValue: dialogRef },
                { provide: AI_DIALOG_DATA, useValue: config.data },
            ],
        });
    }
}
