import { OverlayRef } from "@angular/cdk/overlay";
import { signal } from "@angular/core";
import { filter, Subject, takeUntil } from "rxjs";
import { noopFn } from "../../core";
import { AiAlertDialog } from "./alert-dialog";
import { AiAlertDialogConfig, onClickCallback } from "./alert-dialog.config";

export class AiAlertDialogRef<T = unknown> {
    #destroy = new Subject<void>();
    #closed = signal<boolean>(false);

    componentInstance?: T;

    constructor(private overlayRef: OverlayRef, private config: AiAlertDialogConfig<T>, private instance: AiAlertDialog<T>) {
        instance.cancelTriggered.subscribe(() => this._handleCancel());
        instance.confirmTriggered.subscribe(() => this._handleConfirm());

        this._handleMaskClick();
        this._handleEscapeKey();
    }

    close() {
        if (this.#closed()) return;
        this.#closed.set(true);

        const element = this.instance.element ?? null;
        if (element) {
            element.classList.add("alert-dialog-leave");
        }

        this._waitForAnimationEnd(element)
            .then(() => this._dispose())
            .catch(noopFn);
    }

    private _handleCancel() {
        const cancel = this.config.onCancel;

        if (typeof cancel === "function") {
            const result = (cancel as onClickCallback<T>)(this.componentInstance as T);
            if (result !== false) this.close();
        } else {
            this.close();
        }
    }

    private _handleConfirm() {
        const confirm = this.config.onConfirm;

        if (typeof confirm === "function") {
            const result = (confirm as onClickCallback<T>)(this.componentInstance as T);
            if (result !== false) this.close();
        } else {
            this.close();
        }
    }

    private _handleMaskClick() {
        const maskClosable = this.config.maskClosable ?? true;
        if (!maskClosable) return;
        this.overlayRef
            .outsidePointerEvents()
            .pipe(
                filter(() => this.config.maskClosable ?? true),
                takeUntil(this.#destroy)
            )
            .subscribe(() => this.close());
    }

    private _handleEscapeKey() {
        this.overlayRef
            .keydownEvents()
            .pipe(
                filter(e => e.key === "Escape"),
                takeUntil(this.#destroy)
            )
            .subscribe(() => this.close());
    }

    private async _waitForAnimationEnd(element: HTMLElement | null): Promise<void> {
        if (!element) {
            await new Promise(resolve => setTimeout(resolve, 150));
            return;
        }

        await Promise.race([
            new Promise<void>(resolve => {
                const handler = () => {
                    element.removeEventListener("transitionend", handler);
                    resolve();
                };
                element.addEventListener("transitionend", handler, { once: true });
            }),
            new Promise<void>(resolve => setTimeout(resolve, 150)),
        ]);
    }

    private _dispose() {
        this.overlayRef.dispose();

        if (!this.#destroy.closed) {
            this.#destroy.next();
            this.#destroy.complete();
        }
    }
}
