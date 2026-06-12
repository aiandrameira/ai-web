import { ComponentType, OverlayRef } from "@angular/cdk/overlay";
import { EventEmitter, InjectionToken, TemplateRef } from "@angular/core";

import { AiIconType } from "../icon";

const noopFun = () => void 0;

export type OnClickCallback<T> = (instance: T) => false | void | object;

export class AiDrawerConfig<T = unknown> {
    title?: string | TemplateRef<T>;
    icon?: AiIconType;
    width?: string;
    height?: string;
    customClasses?: string;
    position: "left" | "top" | "right" | "bottom" = "right";
    data?: object;
    component?: ComponentType<T>;
    overlayRef?: OverlayRef;

    cancelIcon?: AiIconType;
    cancelText?: string | null;
    confirmIcon?: AiIconType;
    confirmText?: string | null;
    confirmDisabled?: boolean;

    onConfirm?: EventEmitter<T> | OnClickCallback<T> = noopFun;
    onCancel?: EventEmitter<T> | OnClickCallback<T> = noopFun;
    hideActions?: boolean = false;

    closable?: boolean = true;
    disableClose?: boolean = false;
}

export const AI_DRAWER_CONFIG = new InjectionToken<AiDrawerConfig>("AI_DRAWER_CONFIG");
export const AI_DRAWER_DATA = new InjectionToken<any>("AI_DRAWER_DATA");
