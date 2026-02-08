import { ElementRef, inject, Injectable, TemplateRef, ViewContainerRef } from "@angular/core";
import { Subscription } from "rxjs";
import { AiSelectKeyboardService, AiSelectOverlayService, AiSelectStore, type AiSelectKeyboardContext } from "./services";

export interface AiSelectOpenConfig {
    elementRef: ElementRef<HTMLElement>;
    viewContainerRef: ViewContainerRef;
    dropdownTemplate: TemplateRef<void>;
    width: number;
    keyboardContext: () => AiSelectKeyboardContext;
    onOutsideClick: () => void;
    onAfterOpen?: () => void;
}

@Injectable()
export class AiSelectFacade {
    readonly #store = inject(AiSelectStore);
    readonly #overlay = inject(AiSelectOverlayService);
    readonly #keyboard = inject(AiSelectKeyboardService);

    #keydownSub?: Subscription;
    #outsideSub?: Subscription;

    open(config: AiSelectOpenConfig) {
        if (this.#store.isOpen()) return;

        const overlayRef = this.#overlay.create(config.elementRef, config.width);
        if (!overlayRef) return;

        this.#overlay.attach(config.dropdownTemplate, config.viewContainerRef);
        this.#overlay.updateSize(config.width);

        this.#store.open();

        this.#keydownSub?.unsubscribe();
        this.#keydownSub = this.#overlay.keydownEvents().subscribe(event => {
            this.#keyboard.handleDropdownKeydown(event, config.keyboardContext());
        });

        this.#outsideSub?.unsubscribe();
        this.#outsideSub = this.#overlay.outsidePointerEvents().subscribe(event => {
            const target = event.target as Node | null;
            if (!target || !config.elementRef.nativeElement.contains(target)) {
                config.onOutsideClick();
            }
        });

        config.onAfterOpen?.();
    }

    close(onAfterClose?: () => void) {
        this.#overlay.detach();
        this.#store.close();

        this.#keydownSub?.unsubscribe();
        this.#outsideSub?.unsubscribe();

        onAfterClose?.();
    }

    toggle(config: AiSelectOpenConfig, onAfterClose?: () => void) {
        if (this.#store.isOpen()) {
            this.close(onAfterClose);
        } else {
            this.open(config);
        }
    }

    updateOverlaySize(width: number) {
        this.#overlay.updateSize(width);
    }

    updateOverlayPosition() {
        this.#overlay.updatePosition();
    }

    hasAttached(): boolean {
        return this.#overlay.hasAttached();
    }

    getOverlayElement(): HTMLElement | undefined {
        return this.#overlay.getOverlayElement();
    }

    destroy() {
        this.#keydownSub?.unsubscribe();
        this.#outsideSub?.unsubscribe();
        this.#overlay.destroy();
    }
}
