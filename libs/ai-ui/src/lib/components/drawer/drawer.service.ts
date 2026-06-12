import { Overlay } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { inject, Injectable, Injector } from "@angular/core";

import { AiDrawer } from "./drawer";
import { AI_DRAWER_CONFIG, AI_DRAWER_DATA, AiDrawerConfig } from "./drawer-config";
import { AiDrawerRef } from "./drawer-ref";

@Injectable({
    providedIn: "root",
})
export class AiDrawerService {
    #overlay = inject(Overlay);
    #injector = inject(Injector);

    open<T>(config: AiDrawerConfig<T>): AiDrawerRef {
        const position = this.#overlay.position().global();
        const strategy = config.position ?? "right";

        switch (strategy) {
            case "left":
                position.left("0");
                break;
            case "right":
                position.right("0");
                break;
            case "top":
                position.top("0");
                if (config.width) {
                    position.centerHorizontally();
                }
                break;
            case "bottom":
                position.bottom("0");
                if (config.width) {
                    position.centerHorizontally();
                }
                break;
        }

        const overlayRef = this.#overlay.create({
            height: strategy === "top" || strategy === "bottom" ? (config.height ?? "460px") : (config.height ?? "100%"),
            width: strategy === "top" || strategy === "bottom" ? (config.width ?? "100%") : (config.width ?? "400px"),
            hasBackdrop: true,
            positionStrategy: position,
            panelClass: config.customClasses?.split(" ") ?? [],
        });

        const drawerRef = new AiDrawerRef<T>(overlayRef);

        const drawerInjector = Injector.create({
            parent: this.#injector,
            providers: [
                { provide: AI_DRAWER_CONFIG, useValue: { ...config, overlayRef } },
                { provide: AiDrawerRef, useValue: drawerRef },
            ],
        });

        const drawerComponentRef = overlayRef.attach(new ComponentPortal(AiDrawer, null, drawerInjector));

        const viewInjector = Injector.create({
            parent: drawerInjector,
            providers: [{ provide: AI_DRAWER_DATA, useValue: config.data }],
        });

        if (!config.component) {
            throw new Error("Component not found");
        }

        drawerComponentRef.instance.attachComponent<T>(config.component, viewInjector);

        overlayRef.backdropClick().subscribe(() => {
            if (!config.disableClose) {
                drawerRef.close();
            }
        });

        return drawerRef as AiDrawerRef<unknown>;
    }
}
