import { fromEvent, merge } from "rxjs";

import { DestroyRef, ElementRef, inject, Injectable, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Injectable()
export class AiCarouselService {
    readonly #destroyRef = inject(DestroyRef);

    readonly current = signal(0);
    readonly dragging = signal(false);
    readonly dragOffset = signal(0);

    #total = 0;
    #loop = false;
    #autoplay = false;
    #autoplayInterval = 4000;
    #dragStartX = 0;
    #dragStartY = 0;
    #orientation: "horizontal" | "vertical" = "horizontal";
    #autoplayTimer: ReturnType<typeof setInterval> | null = null;
    #onChange: ((index: number) => void) | null = null;

    configure(options: { total: number; loop: boolean; autoplay: boolean; autoplayInterval: number; orientation: "horizontal" | "vertical"; onChange: (index: number) => void }) {
        this.#total = options.total;
        this.#loop = options.loop;
        this.#autoplay = options.autoplay;
        this.#autoplayInterval = options.autoplayInterval;
        this.#orientation = options.orientation;
        this.#onChange = options.onChange;
    }

    canPrev(): boolean {
        return this.#loop || this.current() > 0;
    }

    canNext(): boolean {
        return this.#loop || this.current() < this.#total - 1;
    }

    prev() {
        if (this.#total === 0) return;
        const current = this.current();
        if (current > 0) {
            this._goTo(current - 1);
        } else if (this.#loop) {
            this._goTo(this.#total - 1);
        }
    }

    next() {
        if (this.#total === 0) return;
        const current = this.current();
        if (current < this.#total - 1) {
            this._goTo(current + 1);
        } else if (this.#loop) {
            this._goTo(0);
        }
    }

    goTo(index: number) {
        this._goTo(index);
    }

    setupDrag(elRef: ElementRef) {
        const el = elRef.nativeElement as HTMLElement;

        const mouseDown$ = fromEvent<MouseEvent>(el, "mousedown");
        const mouseMove$ = fromEvent<MouseEvent>(document, "mousemove");
        const mouseUp$ = fromEvent<MouseEvent>(document, "mouseup");
        const touchStart$ = fromEvent<TouchEvent>(el, "touchstart", { passive: true });
        const touchMove$ = fromEvent<TouchEvent>(document, "touchmove", { passive: true });
        const touchEnd$ = fromEvent<TouchEvent>(document, "touchend");

        merge(mouseDown$, touchStart$)
            .pipe(takeUntilDestroyed(this.#destroyRef))
            .subscribe(event => {
                const point = this._getEventPoint(event);
                this.#dragStartX = point.x;
                this.#dragStartY = point.y;
                this.dragging.set(true);
            });

        merge(mouseMove$, touchMove$)
            .pipe(takeUntilDestroyed(this.#destroyRef))
            .subscribe(event => {
                if (!this.dragging()) return;
                const point = this._getEventPoint(event);
                const isH = this.#orientation === "horizontal";
                const diff = isH ? point.x - this.#dragStartX : point.y - this.#dragStartY;
                const size = isH ? el.offsetWidth : el.offsetHeight;
                this.dragOffset.set((diff / size) * 100);
            });

        merge(mouseUp$, touchEnd$)
            .pipe(takeUntilDestroyed(this.#destroyRef))
            .subscribe(() => {
                if (!this.dragging()) return;
                const offset = this.dragOffset();
                const threshold = 15;
                if (offset < -threshold) {
                    this.next();
                } else if (offset > threshold) {
                    this.prev();
                }
                this.dragOffset.set(0);
                this.dragging.set(false);
            });
    }

    startAutoplay() {
        if (!this.#autoplay) return;
        this._stopAutoplay();
        this.#autoplayTimer = setInterval(() => this.next(), this.#autoplayInterval);
    }

    private _goTo(index: number) {
        this.current.set(index);
        this.#onChange?.(index);
        this._restartAutoplay();
    }

    private _getEventPoint(event: MouseEvent | TouchEvent): { x: number; y: number } {
        if ("touches" in event) {
            const touch = event.touches[0] ?? event.changedTouches[0];
            return { x: touch.clientX, y: touch.clientY };
        }
        return { x: event.clientX, y: event.clientY };
    }

    private _stopAutoplay() {
        if (this.#autoplayTimer) {
            clearInterval(this.#autoplayTimer);
            this.#autoplayTimer = null;
        }
    }

    private _restartAutoplay() {
        if (this.#autoplay) {
            this.startAutoplay();
        }
    }
}
