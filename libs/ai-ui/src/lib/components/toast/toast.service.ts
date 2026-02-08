import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { inject, Injectable, signal } from "@angular/core";
import { AiToast } from "./toast";
import { AiToastConfig } from "./toast.config";

@Injectable({
    providedIn: "root",
})
export class AiToastService {
    #overlay = inject(Overlay);
    #overlayRef?: OverlayRef;

    readonly #toastConfig = signal<AiToastConfig[]>([]);
    readonly toastConfig = this.#toastConfig.asReadonly();

    private _ensureOverlay() {
        if (!this.#overlayRef) {
            this.#overlayRef = this.#overlay.create({
                positionStrategy: this.#overlay.position().global(),
                scrollStrategy: this.#overlay.scrollStrategies.noop(),
                hasBackdrop: false,
            });
        }
        return this.#overlayRef;
    }

    private _attachToOverlay() {
        const overlayRef = this._ensureOverlay();
        if (!overlayRef.hasAttached()) {
            const portal = new ComponentPortal(AiToast);
            overlayRef.attach(portal);
        }
    }

    private _addToast(config: AiToastConfig, duration: number) {
        this._attachToOverlay();
        this.#toastConfig.update(current => [...current, config]);
        setTimeout(() => this.remove(config.id), duration);
    }

    remove(id: number) {
        this.#toastConfig.update(current => current.filter(t => t.id !== id));
    }

    default({ message, description, icon, duration = 3000, position }: Partial<AiToastConfig>) {
        this._addToast({ id: Date.now(), message, description, type: "default", position, icon }, duration);
    }

    success({ message, description, duration = 3000, position }: Partial<AiToastConfig>) {
        this._addToast({ id: Date.now(), message, description, type: "success", position }, duration);
    }

    warning({ message, description, duration = 3000, position }: Partial<AiToastConfig>) {
        this._addToast({ id: Date.now(), message, description, type: "warning", position }, duration);
    }

    destructive({ message, description, duration = 3000, position }: Partial<AiToastConfig>) {
        this._addToast({ id: Date.now(), message, description, type: "destructive", position }, duration);
    }

    info({ message, description, duration = 3000, position }: Partial<AiToastConfig>) {
        this._addToast({ id: Date.now(), message, description, type: "info", position }, duration);
    }
}
