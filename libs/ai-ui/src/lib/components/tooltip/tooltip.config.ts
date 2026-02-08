import type { ConnectedPosition } from "@angular/cdk/overlay";
import { TemplateRef } from "@angular/core";

export const TOOLTIP_POSITIONS_MAP: { [key: string]: ConnectedPosition } = {
    top: {
        originX: "center",
        originY: "top",
        overlayX: "center",
        overlayY: "bottom",
        offsetY: -8,
    },
    bottom: {
        originX: "center",
        originY: "bottom",
        overlayX: "center",
        overlayY: "top",
        offsetY: 8,
    },
    left: {
        originX: "start",
        originY: "center",
        overlayX: "end",
        overlayY: "center",
        offsetX: -8,
    },
    right: {
        originX: "end",
        originY: "center",
        overlayX: "start",
        overlayY: "center",
        offsetX: 8,
    },
};

export type AiTooltipTriggers = "click" | "hover";
export type AiTooltipType = string | TemplateRef<void> | null;

export interface AiDelayConfig {
    show: boolean;
    delay: number;
}

export const throttle = (callback: () => void, wait: number) => {
    let time = Date.now();
    return function () {
        if (time + wait - Date.now() < 0) {
            callback();
            time = Date.now();
        }
    };
};
