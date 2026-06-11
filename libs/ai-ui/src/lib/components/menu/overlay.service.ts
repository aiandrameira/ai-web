/* eslint-disable @angular-eslint/prefer-inject */
import { Overlay, OverlayPositionBuilder, OverlayRef } from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";
import { ElementRef, Injectable, TemplateRef, ViewContainerRef } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class OverlayService {
    #overlay: Overlay;
    #positionBuilder: OverlayPositionBuilder;

    constructor(
        public overlay: Overlay,
        public positionBuilder: OverlayPositionBuilder,
    ) {
        this.#overlay = overlay;
        this.#positionBuilder = positionBuilder;
    }

    create(element: ElementRef): OverlayRef {
        const positionStrategy = this.#positionBuilder
            .flexibleConnectedTo(element)
            .withPositions([
                { originX: "start", originY: "bottom", overlayX: "start", overlayY: "top", offsetY: 4 },
                { originX: "end", originY: "bottom", overlayX: "end", overlayY: "top", offsetY: 4 },
                { originX: "center", originY: "bottom", overlayX: "center", overlayY: "top", offsetY: 4 },
                { originX: "start", originY: "top", overlayX: "start", overlayY: "bottom", offsetY: -4 },
                { originX: "end", originY: "top", overlayX: "end", overlayY: "bottom", offsetY: -4 },
                { originX: "center", originY: "top", overlayX: "center", overlayY: "bottom", offsetY: -4 },
                { originX: "end", originY: "center", overlayX: "start", overlayY: "center", offsetX: 4 },
                { originX: "start", originY: "center", overlayX: "end", overlayY: "center", offsetX: -4 },
            ])
            .withPush(true)
            .withFlexibleDimensions(true)
            .withViewportMargin(8)
            .withGrowAfterOpen(true);

        return this.#overlay.create({
            positionStrategy,
            hasBackdrop: false,
            scrollStrategy: this.#overlay.scrollStrategies.reposition(),
            minWidth: 200,
            maxHeight: 400,
            maxWidth: 500,
            panelClass: ["ai-menu-overlay-panel"],
        });
    }

    attach(ref: OverlayRef, template: TemplateRef<unknown>, view: ViewContainerRef) {
        ref.attach(new TemplatePortal(template, view));
    }

    detach(ref?: OverlayRef) {
        if (ref?.hasAttached()) ref.detach();
    }

    destroy(ref?: OverlayRef) {
        ref?.dispose();
    }
}
