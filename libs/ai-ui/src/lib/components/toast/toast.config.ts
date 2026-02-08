import { AiIconType } from "../icon/icons";

export type AiToastType = "info" | "success" | "warning" | "destructive" | "default";

export type AiToastPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

export interface AiToastConfig {
    id: number;
    message: string | unknown;
    description?: string;
    type: AiToastType;
    icon?: AiIconType;
    duration?: number;
    position?: AiToastPosition;
}
