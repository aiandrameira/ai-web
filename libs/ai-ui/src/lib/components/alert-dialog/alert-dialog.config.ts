import { ClassValue } from "clsx";

import { EventEmitter, TemplateRef, Type, ViewContainerRef } from "@angular/core";

import { noopFn } from "../../core";
import { AiIconType } from "../icon/icons";

interface AiAlertDialogIcon {
    name: AiIconType;
    color?: "primary" | "warning" | "destructive";
}

export type onClickCallback<T> = (instance: T) => false | void | object;

export class AiAlertDialogConfig<T> {
    icon?: AiAlertDialogIcon;
    title?: string | TemplateRef<T>;
    description?: string;
    component?: string | TemplateRef<T> | Type<T>;
    closable?: boolean;
    width?: string;
    customClasses?: ClassValue;
    data?: object;
    maskClosable?: boolean;
    confirmDestructive?: boolean;
    confirmDisabled?: boolean;
    confirmText?: string | null;
    cancelText?: string | null;
    onCancel?: EventEmitter<T> | onClickCallback<T> = noopFn;
    onConfirm?: EventEmitter<T> | onClickCallback<T> = noopFn;
    viewContainerRef?: ViewContainerRef;
}
