import { ConnectedPosition } from "@angular/cdk/overlay";

export type AiPopoverTrigger = "click" | "hover" | null;
export type AiPopoverPosition = "top" | "bottom" | "left" | "right";

export const popoverPositionsMap = {
    top: {
        originX: "center",
        originY: "top",
        overlayX: "center",
        overlayY: "bottom",
        offsetX: 0,
        offsetY: -8,
    },
    bottom: {
        originX: "center",
        originY: "bottom",
        overlayX: "center",
        overlayY: "top",
        offsetX: 0,
        offsetY: 8,
    },
    left: {
        originX: "start",
        originY: "center",
        overlayX: "end",
        overlayY: "center",
        offsetX: -8,
        offsetY: 0,
    },
    right: {
        originX: "end",
        originY: "center",
        overlayX: "start",
        overlayY: "center",
        offsetX: 8,
        offsetY: 0,
    },
};

export const fallbackPositions: Record<AiPopoverPosition, ConnectedPosition[]> = {
    bottom: [
        {
            originX: "center",
            originY: "top",
            overlayX: "center",
            overlayY: "bottom",
            offsetX: 0,
            offsetY: -8,
        },
        {
            originX: "end",
            originY: "center",
            overlayX: "start",
            overlayY: "center",
            offsetX: 8,
            offsetY: 0,
        },
        {
            originX: "start",
            originY: "center",
            overlayX: "end",
            overlayY: "center",
            offsetX: -8,
            offsetY: 0,
        },
    ],
    top: [
        {
            originX: "center",
            originY: "bottom",
            overlayX: "center",
            overlayY: "top",
            offsetX: 0,
            offsetY: 8,
        },
        {
            originX: "end",
            originY: "center",
            overlayX: "start",
            overlayY: "center",
            offsetX: 8,
            offsetY: 0,
        },
        {
            originX: "start",
            originY: "center",
            overlayX: "end",
            overlayY: "center",
            offsetX: -8,
            offsetY: 0,
        },
    ],
    right: [
        {
            originX: "start",
            originY: "center",
            overlayX: "end",
            overlayY: "center",
            offsetX: -8,
            offsetY: 0,
        },
        {
            originX: "center",
            originY: "bottom",
            overlayX: "center",
            overlayY: "top",
            offsetX: 0,
            offsetY: 8,
        },
        {
            originX: "center",
            originY: "top",
            overlayX: "center",
            overlayY: "bottom",
            offsetX: 0,
            offsetY: -8,
        },
    ],
    left: [
        {
            originX: "end",
            originY: "center",
            overlayX: "start",
            overlayY: "center",
            offsetX: 8,
            offsetY: 0,
        },
        {
            originX: "center",
            originY: "bottom",
            overlayX: "center",
            overlayY: "top",
            offsetX: 0,
            offsetY: 8,
        },
        {
            originX: "center",
            originY: "top",
            overlayX: "center",
            overlayY: "bottom",
            offsetX: 0,
            offsetY: -8,
        },
    ],
};
