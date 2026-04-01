import { Overlay, OverlayPositionBuilder, type OverlayRef } from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";
import { isPlatformBrowser } from "@angular/common";
import { ElementRef, inject, Injectable, PLATFORM_ID, TemplateRef, ViewContainerRef } from "@angular/core";
import { EMPTY, type Observable } from "rxjs";

@Injectable()
export class AiAutocompleteOverlayService {
    readonly #overlay = inject(Overlay);
    readonly #overlayPositionBuilder = inject(OverlayPositionBuilder);
    readonly #platformId = inject(PLATFORM_ID);

    #overlayRef?: OverlayRef;
    #portal?: TemplatePortal;

    create(origin: ElementRef<HTMLElement>, width: number): OverlayRef | undefined {
        if (this.#overlayRef) return this.#overlayRef;
        if (!isPlatformBrowser(this.#platformId)) return;

        const positionStrategy = this.#overlayPositionBuilder
            .flexibleConnectedTo(origin)
            .withPositions([
                { originX: "start", originY: "bottom", overlayX: "start", overlayY: "top", offsetY: 4 },
                { originX: "start", originY: "top", overlayX: "start", overlayY: "bottom", offsetY: -4 },
            ])
            .withPush(false);

        this.#overlayRef = this.#overlay.create({
            positionStrategy,
            hasBackdrop: false,
            scrollStrategy: this.#overlay.scrollStrategies.reposition(),
            width,
            maxHeight: 256,
        });

        return this.#overlayRef;
    }

    attach(template: TemplateRef<void>, viewContainerRef: ViewContainerRef) {
        if (!this.#overlayRef) return;
        if (this.#overlayRef.hasAttached()) {
            this.#overlayRef.detach();
        }
        this.#portal = new TemplatePortal(template, viewContainerRef);
        this.#overlayRef.attach(this.#portal);
    }

    detach() {
        if (this.#overlayRef?.hasAttached()) {
            this.#overlayRef.detach();
        }
    }

    destroy() {
        this.#overlayRef?.dispose();
        this.#overlayRef = undefined;
        this.#portal = undefined;
    }

    getOverlayElement(): HTMLElement | undefined {
        return this.#overlayRef?.overlayElement;
    }

    outsidePointerEvents(): Observable<MouseEvent | TouchEvent> {
        return this.#overlayRef?.outsidePointerEvents() ?? EMPTY;
    }
}
