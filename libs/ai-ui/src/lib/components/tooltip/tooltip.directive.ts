import { filter, map, of, Subject, switchMap, tap, timer } from "rxjs";

import { Overlay, OverlayPositionBuilder, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { isPlatformBrowser } from "@angular/common";
import {
    ComponentRef,
    computed,
    DestroyRef,
    Directive,
    DOCUMENT,
    effect,
    ElementRef,
    inject,
    Injector,
    input,
    numberAttribute,
    OnDestroy,
    OnInit,
    output,
    PLATFORM_ID,
    Renderer2,
    runInInjectionContext,
    TemplateRef,
} from "@angular/core";
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";

import { AiTooltip } from "./tooltip";
import { AiDelayConfig, AiTooltipTriggers, AiTooltipType, throttle, TOOLTIP_POSITIONS_MAP } from "./tooltip.config";
import { TooltipPositionVariants } from "./tooltip.variants";

@Directive({
    selector: "[aiTooltip]",
    exportAs: "aiTooltip",
    host: {
        style: "cursor: pointer",
    },
})
export class AiTooltipDirective implements OnInit, OnDestroy {
    #destroyRef = inject(DestroyRef);
    #document = inject(DOCUMENT);
    #elementRef = inject(ElementRef<HTMLElement>);
    #injector = inject(Injector);
    #overlay = inject(Overlay);
    #overlayPositionBuilder = inject(OverlayPositionBuilder);
    #platformId = inject(PLATFORM_ID);
    #renderer = inject(Renderer2);

    #delaySubject?: Subject<AiDelayConfig>;
    #componentRef?: ComponentRef<AiTooltip>;
    #listenersRefs: (() => void)[] = [];
    #overlayRef?: OverlayRef;
    #ariaEffectRef?: ReturnType<typeof effect>;

    readonly aiPosition = input<TooltipPositionVariants>("top");
    readonly aiTrigger = input<AiTooltipTriggers>("hover");
    readonly aiTooltip = input<AiTooltipType>(null);
    readonly aiShowDelay = input(150, { transform: numberAttribute });
    readonly aiHideDelay = input(100, { transform: numberAttribute });

    readonly show = output<void>();
    readonly hide = output<void>();

    private readonly tooltipLabel = computed<string | TemplateRef<void>>(() => {
        let tooltipLabel = this.aiTooltip();
        if (!tooltipLabel) return "";
        else if (typeof tooltipLabel === "string") tooltipLabel = tooltipLabel.trim();
        return tooltipLabel;
    });

    ngOnInit() {
        if (isPlatformBrowser(this.#platformId)) {
            const positionStrategy = this.#overlayPositionBuilder.flexibleConnectedTo(this.#elementRef).withPositions([TOOLTIP_POSITIONS_MAP[this.aiPosition()]]);
            this.#overlayRef = this.#overlay.create({ positionStrategy });

            runInInjectionContext(this.#injector, () => {
                toObservable(this.aiTrigger)
                    .pipe(
                        tap(() => {
                            this._setupDelay();
                            this._cleanupTriggerEvent();
                            this._initTriggers();
                        }),
                        filter(() => !!this.#overlayRef),
                        switchMap(() => (this.#overlayRef as OverlayRef).outsidePointerEvents()),
                        filter(event => !this.#elementRef.nativeElement.contains(event.target)),
                        takeUntilDestroyed(this.#destroyRef),
                    )
                    .subscribe(() => this._delay(false, 0));
            });
        }
    }

    private _initTriggers() {
        this._initScrollListener();
        this._initClickListeners();
        this._initHoverListeners();
    }

    private _initClickListeners() {
        if (this.aiTrigger() !== "click") return;

        this.#listenersRefs = [
            ...this.#listenersRefs,
            this.#renderer.listen(this.#elementRef.nativeElement, "click", () => {
                const shouldShowTooltip = !this.#overlayRef?.hasAttached();
                const delay = shouldShowTooltip ? this.aiShowDelay() : this.aiHideDelay();
                this._delay(shouldShowTooltip, delay);
            }),
        ];
    }

    private _initHoverListeners() {
        if (this.aiTrigger() !== "hover") return;

        this.#listenersRefs = [
            ...this.#listenersRefs,
            this.#renderer.listen(this.#elementRef.nativeElement, "mouseenter", () => this._delay(true, this.aiShowDelay())),
            this.#renderer.listen(this.#elementRef.nativeElement, "mouseleave", () => this._delay(false, this.aiHideDelay())),
            this.#renderer.listen(this.#elementRef.nativeElement, "focus", () => this._delay(true, this.aiShowDelay())),
            this.#renderer.listen(this.#elementRef.nativeElement, "blur", () => this._delay(false, this.aiHideDelay())),
        ];
    }

    private _initScrollListener() {
        this.#listenersRefs = [
            ...this.#listenersRefs,
            this.#renderer.listen(
                this.#document.defaultView,
                "scroll",
                throttle(() => this._delay(false, 0), 100),
            ),
        ];
    }

    private _cleanupTriggerEvent() {
        for (const event of this.#listenersRefs) {
            event();
        }
        this.#listenersRefs = [];
    }

    private _delay(show: boolean, delay = -1) {
        this.#delaySubject?.next({ show, delay });
    }

    private _setupDelay() {
        this.#delaySubject?.complete();
        this.#delaySubject = new Subject<AiDelayConfig>();

        this.#delaySubject
            .pipe(
                switchMap(config => (config.delay < 0 ? of(config) : timer(config.delay).pipe(map(() => config)))),
                takeUntilDestroyed(this.#destroyRef),
            )
            .subscribe(config => {
                if (config.show) this._show();
                else this._hide();
            });
    }

    private _show() {
        if (this.#componentRef || !this.tooltipLabel()) return;

        const tooltipPortal = new ComponentPortal(AiTooltip);
        this.#componentRef = this.#overlayRef?.attach(tooltipPortal);
        this.#componentRef?.onDestroy(() => (this.#componentRef = undefined));
        this.#componentRef?.instance.state.set("opened");
        this.#componentRef?.instance.setLabel(this.tooltipLabel(), this.aiPosition());

        runInInjectionContext(this.#injector, () => {
            this.#ariaEffectRef = effect(() => {
                const tooltipId = this.#componentRef?.instance.uniqueId()?.id();
                if (tooltipId) {
                    this.#renderer.setAttribute(this.#elementRef.nativeElement, "aria-describedby", tooltipId);
                    this.#ariaEffectRef?.destroy();
                    this.#ariaEffectRef = undefined;
                }
            });
        });

        this.show.emit();
    }

    private _hide() {
        if (!this.#componentRef) return;

        if (this.#ariaEffectRef) {
            this.#ariaEffectRef.destroy();
            this.#ariaEffectRef = undefined;
        }

        this.#renderer.removeAttribute(this.#elementRef.nativeElement, "aria-describedby");
        this.#componentRef.instance.state.set("closed");
        this.hide.emit();
        this.#overlayRef?.detach();
    }

    ngOnDestroy() {
        if (this.#ariaEffectRef) {
            this.#ariaEffectRef.destroy();
            this.#ariaEffectRef = undefined;
        }

        this._cleanupTriggerEvent();
        this.#delaySubject?.complete();
        this.#overlayRef?.dispose();
    }
}
