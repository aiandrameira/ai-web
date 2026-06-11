import { Subject } from "rxjs";

import { ConnectedPosition, Overlay, OverlayPositionBuilder, OverlayRef } from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";
import { Directive, effect, ElementRef, inject, input, OnDestroy, OnInit, output, Renderer2, signal, TemplateRef, ViewContainerRef } from "@angular/core";

import { AiPopoverPosition, AiPopoverTrigger, fallbackPositions, popoverPositionsMap } from "./popover.interface";

@Directive({
    selector: "[aiPopover]",
    exportAs: "aiPopover",
})
export class AiPopoverDirective implements OnInit, OnDestroy {
    #overlay = inject(Overlay);
    #overlayPositionBuilder = inject(OverlayPositionBuilder);
    #elementRef = inject(ElementRef);
    #renderer = inject(Renderer2);
    #viewContainerRef = inject(ViewContainerRef);

    #destroy = new Subject<void>();

    readonly trigger = input<AiPopoverTrigger>("click");
    readonly content = input.required<TemplateRef<unknown>>();
    readonly position = input<AiPopoverPosition>("bottom");
    readonly origin = input<ElementRef>();
    readonly visible = input<boolean>(false);
    readonly close = input<boolean>(true);

    readonly visibleChange = output<boolean>();

    protected overlayRef?: OverlayRef;
    protected documentClickListenerRef?: () => void;
    protected isVisible = signal<boolean>(false);

    protected nativeElement = () => this.origin()?.nativeElement || this.#elementRef.nativeElement;

    constructor() {
        effect(() => {
            const visible = this.visible();

            setTimeout(() => {
                const currentlyVisible = this.isVisible();
                if (visible && !currentlyVisible) {
                    this.show();
                } else if (!visible && currentlyVisible) {
                    this.hide();
                }
            });
        });
    }

    ngOnInit() {
        this._setupTriggers();
        this._createOverlay();
    }

    ngOnDestroy() {
        this.hide();
        this.#destroy.next();
        this.#destroy.complete();
    }

    show() {
        if (this.isVisible()) return;
        if (!this.overlayRef) this._createOverlay();

        const templatePortal = new TemplatePortal(this.content(), this.#viewContainerRef);
        this.overlayRef?.attach(templatePortal);
        this.isVisible.set(true);
        this.visibleChange.emit(true);

        if (this.close() && this.trigger() === "click") this._setupOutsideClickListener();
    }

    hide() {
        if (!this.isVisible()) return;

        this.overlayRef?.detach();
        this.isVisible.set(false);
        this.visibleChange.emit(false);

        if (this.documentClickListenerRef) {
            this.documentClickListenerRef();
            this.documentClickListenerRef = undefined;
        }
    }

    toggle() {
        if (this.isVisible()) {
            this.hide();
        } else {
            this.show();
        }
    }

    private _setupTriggers() {
        const trigger = this.trigger();
        if (!trigger) return;

        if (trigger === "click") {
            this.#renderer.listen(this.nativeElement(), "click", (event: Event) => {
                event.stopPropagation();
                this.toggle();
            });
        } else if (trigger === "hover") {
            this.#renderer.listen(this.nativeElement(), "mouseenter", () => this.show());
            this.#renderer.listen(this.nativeElement(), "mouseleave", () => this.hide());
        }
    }

    private _createOverlay() {
        const positionStrategy = this.#overlayPositionBuilder
            .flexibleConnectedTo(this.nativeElement())
            .withPositions(this._positionsContainer())
            .withPush(true)
            .withFlexibleDimensions(true)
            .withViewportMargin(8);

        this.overlayRef = this.#overlay.create({
            positionStrategy,
            hasBackdrop: false,
            scrollStrategy: this.#overlay.scrollStrategies.close(),
        });
    }

    private _positionsContainer(): ConnectedPosition[] {
        const position = this.position() as AiPopoverPosition;

        const primaryConfig = popoverPositionsMap[position];
        const primary: ConnectedPosition = {
            originX: primaryConfig.originX as any,
            originY: primaryConfig.originY as any,
            overlayX: primaryConfig.overlayX as any,
            overlayY: primaryConfig.overlayY as any,
            offsetX: primaryConfig.offsetX || 0,
            offsetY: primaryConfig.offsetY || 0,
        };

        return [primary, ...fallbackPositions[position]];
    }

    private _setupOutsideClickListener() {
        setTimeout(() => {
            this.documentClickListenerRef = this.#renderer.listen(document, "click", (event: MouseEvent) => {
                const clickTarget = event.target as HTMLElement;
                const overlayElement = this.overlayRef?.overlayElement;

                if (this.nativeElement().contains(clickTarget)) return;

                if (overlayElement && overlayElement.contains(clickTarget)) return;

                const isInCdkOverlay = clickTarget.closest(".cdk-overlay-container") !== null;
                if (isInCdkOverlay) return;

                this.hide();
            });
        });
    }
}
