import { CdkPortalOutlet } from "@angular/cdk/portal";
import { ChangeDetectionStrategy, Component, computed, inject, Injector, Type, ViewChild, ViewContainerRef, ViewEncapsulation } from "@angular/core";

import { mergeClasses } from "../../core";
import { AiButton } from "../button";
import { AiIcon } from "../icon";
import { AiTooltipDirective } from "../tooltip";
import { AI_DRAWER_CONFIG, AiDrawerConfig } from "./drawer-config";
import { AiDrawerRef } from "./drawer-ref";
import { drawerVariants } from "./drawer.variants";

@Component({
    selector: "ai-drawer",
    exportAs: "aiDrawer",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [AiButton, AiTooltipDirective, AiIcon],
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

    onConfirm() {
        const cfg = this.config as AiDrawerConfig & { onConfirm?: any };

        if (cfg?.onConfirm) {
            if (typeof cfg.onConfirm?.emit === "function") {
                cfg.onConfirm.emit(this._childInstance);
                return;
            }

            if (typeof cfg.onConfirm === "function") {
                cfg.onConfirm(this._childInstance);
                return;
            }
        }

        if (this._childInstance && typeof this._childInstance.onConfirm === "function") {
            this._childInstance.onConfirm();
        }
    }

    onCancel() {
        const cfg = this.config as AiDrawerConfig & { onCancel?: any };

        if (cfg?.onCancel) {
            if (typeof cfg.onCancel?.emit === "function") {
                cfg.onCancel.emit(this._childInstance);
                return;
            }

            if (typeof cfg.onCancel === "function") {
                cfg.onCancel(this._childInstance);
                return;
            }
        }

        if (this._childInstance && typeof this._childInstance.onCancel === "function") {
            this._childInstance.onCancel();
        }
    }
}
