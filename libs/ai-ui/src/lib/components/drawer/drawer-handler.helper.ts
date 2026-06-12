import { GlobalPositionStrategy, OverlayPositionBuilder } from "@angular/cdk/overlay";

import { AiDrawerConfig } from "./drawer-config";

export type AiDrawerHandler = "left" | "right" | "top" | "bottom";

export function buildDrawerPosition(handler: AiDrawerHandler, builder: OverlayPositionBuilder, config: AiDrawerConfig): GlobalPositionStrategy {
    const position = builder.global();

    switch (handler) {
        case "left":
            position.left("0");
            break;
        case "right":
            position.right("0");
            break;
        case "top":
            position.top("0");
            if (config.width) position.centerHorizontally();
            break;
        case "bottom":
            position.bottom("0");
            if (config.width) position.centerHorizontally();
            break;
    }

    return position;
}

export function buildDrawerSize(handler: AiDrawerHandler, config: AiDrawerConfig): { width: string; height: string } {
    return {
        width: handler === "top" || handler === "bottom" ? (config.width ?? "100%") : (config.width ?? "400px"),
        height: handler === "top" || handler === "bottom" ? (config.height ?? "460px") : (config.height ?? "100%"),
    };
}
