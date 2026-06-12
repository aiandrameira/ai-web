import { CdkPortalOutlet } from "@angular/cdk/portal";
import { ChangeDetectionStrategy, Component, computed, inject, Injector, Type, ViewChild, ViewContainerRef, ViewEncapsulation } from "@angular/core";

import { mergeClasses } from "../../core";
import { AiButton } from "../button";
import { AiTooltip } from "../tooltip";
import { AI_DRAWER_CONFIG, AiDrawerConfig } from "./drawer-config";
import { AiDrawerRef } from "./drawer-ref";
import { drawerVariants } from "./drawer.variants";

@Component({
    selector: "ai-drawer",
    exportAs: "aiDrawer",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [AiButton, AiTooltip],
    templateUrl: "./drawer.html",
    host: {
        "[class]": "config?.position === 'top' || config?.position === 'bottom' ? 'w-screen' : 'w-full'",
    },
})
export class AiDrawer {
    #drawerRef = inject(AiDrawerRef);
    public config = inject<AiDrawerConfig>(AI_DRAWER_CONFIG);

    @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet!: CdkPortalOutlet;
    @ViewChild("viewContainerRef", { read: ViewContainerRef, static: true })
    private viewContainerRef!: ViewContainerRef;

    private _childInstance: any;

    protected classes = computed(() => mergeClasses(drawerVariants(), this.config?.customClasses));
    protected hasStringComponent = typeof this.config.component === "string";

    attachComponent<T>(component: Type<T>, injector: Injector) {
        const ref = this.viewContainerRef.createComponent(component, { injector });
        this._childInstance = ref.instance;
    }

    onClose() {
        this.#drawerRef.close();
    }

    onSearch() {
        const cfg = this.config as AiDrawerConfig & { onSearch?: any };

        if (cfg?.onSearch) {
            if (typeof cfg.onSearch?.emit === "function") {
                cfg.onSearch.emit(this._childInstance);
                return;
            }

            if (typeof cfg.onSearch === "function") {
                cfg.onSearch(this._childInstance);
                return;
            }
        }

        if (this._childInstance && typeof this._childInstance.onSearch === "function") {
            this._childInstance.onSearch();
        }
    }

    onClear() {
        const cfg = this.config as AiDrawerConfig & { onClear?: any };

        if (cfg?.onClear) {
            if (typeof cfg.onClear?.emit === "function") {
                cfg.onClear.emit(this._childInstance);
                return;
            }

            if (typeof cfg.onClear === "function") {
                cfg.onClear(this._childInstance);
                return;
            }
        }

        if (this._childInstance && typeof this._childInstance.onClear === "function") {
            this._childInstance.onClear();
        }
    }
}
