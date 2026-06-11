import { EventEmitter, TemplateRef, Type, ViewContainerRef } from "@angular/core";

import { noopFn } from "../../core";
import { AiIconType } from "../icon";

export type onClickCallback<T> = (instance: T) => false | void | object;

export class AiDialogConfig<T, U> {
    cancelIcon?: AiIconType;
    cancelText?: string | null;
    confirmIcon?: AiIconType;
    confirmText?: string | null;
    closable?: boolean;
    component?: string | TemplateRef<T> | Type<T>;
    customClasses?: string;
    data?: U;
    title?: string | TemplateRef<T>;
    description?: string;
    hideFooter?: boolean;
    maskClosable?: boolean;
    confirmDestructive?: boolean;
    confirmDisabled?: boolean;
    onCancel?: EventEmitter<T> | onClickCallback<T> = noopFn;
    onConfirm?: EventEmitter<T> | onClickCallback<T> = noopFn;
    viewContainerRef?: ViewContainerRef;
    width?: string;
}
