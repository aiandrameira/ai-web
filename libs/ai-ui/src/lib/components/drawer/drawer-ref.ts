import { Observable, Subject } from "rxjs";

import { OverlayRef } from "@angular/cdk/overlay";

export class AiDrawerRef<T = any> {
    readonly #afterClosed = new Subject<T | undefined>();

    afterClosed = (): Observable<T | undefined> => this.#afterClosed.asObservable();

    constructor(private overlayRef: OverlayRef) {}

    close(result?: T) {
        this.overlayRef.dispose();
        this.#afterClosed.next(result);
        this.#afterClosed.complete();
    }
}
