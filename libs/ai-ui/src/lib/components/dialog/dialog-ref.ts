import { filter, fromEvent, Subject, takeUntil } from "rxjs";

import { OverlayRef } from "@angular/cdk/overlay";
import { isPlatformBrowser } from "@angular/common";
import { EventEmitter, Inject, PLATFORM_ID, signal } from "@angular/core";

import { AiDialog } from "./dialog";
import { AiDialogConfig } from "./dialog.config";

const enum triggerActionEnum {
    CANCEL = "cancel",
    CONFIRM = "confirm",
}

export class AiDialogRef<T = any, R = any, U = any> {
    #destroyed = new Subject<void>();
    #closed = signal<boolean>(false);

    protected result?: R;
    componentInstance?: T | null = null;

    #getContentComponent = (): T => this.componentInstance as T;

    constructor(
        private overlayRef: OverlayRef,
        private config: AiDialogConfig<T, U>,
        private instance: AiDialog<T, U>,
        @Inject(PLATFORM_ID) private platformId: object,
    ) {
        this.instance.cancelTriggered.subscribe(() => this._trigger(triggerActionEnum.CANCEL));
        this.instance.confirmTriggered.subscribe(() => this._trigger(triggerActionEnum.CONFIRM));

        if ((this.config.maskClosable ?? true) && isPlatformBrowser(this.platformId)) {
            this.overlayRef
                .outsidePointerEvents()
                .pipe(takeUntil(this.#destroyed))
                .subscribe(() => this.close());
        }

        if (isPlatformBrowser(this.platformId)) {
            fromEvent<KeyboardEvent>(document, "keydown")
                .pipe(
                    filter(event => event.key === "Escape"),
                    takeUntil(this.#destroyed),
                )
                .subscribe(() => this.close());
        }
    }

    close(result?: R) {
        if (this.#closed()) return;

        this.#closed.set(true);
        this.result = result;

        if (isPlatformBrowser(this.platformId)) {
            const element = this.instance.nativeElement();
            element.classList.add("dialog-leave");
        }

        setTimeout(() => {
            if (this.overlayRef) {
                if (this.overlayRef.hasAttached()) {
                    this.overlayRef.detachBackdrop();
                }
                this.overlayRef.dispose();
            }

            if (!this.#destroyed.closed) {
                this.#destroyed.next();
                this.#destroyed.complete();
            }
        }, 150);
    }

    private _trigger(action: triggerActionEnum) {
        const trigger = { confirm: this.config.onConfirm, cancel: this.config.onCancel }[action];

        if (trigger instanceof EventEmitter) {
            trigger.emit(this.#getContentComponent());
        } else if (typeof trigger === "function") {
            const result = trigger(this.#getContentComponent()) as R;
            this._closeWithResult(result);
        } else {
            this.close();
        }
    }

    private _closeWithResult(result: R): void {
        if (result !== false) {
            this.close(result);
        }
    }
}
