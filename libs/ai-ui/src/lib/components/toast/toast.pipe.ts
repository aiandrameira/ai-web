import { Pipe, PipeTransform } from "@angular/core";
import { AiIconType } from "../icon/icons";
import { AiToastConfig } from "./toast.config";

interface ToastVariant {
    container: string;
    icon: AiIconType;
    bgButton: string;
    color: string;
}

const variantMap: Record<string, ToastVariant> = {
    success: {
        container: "bg-success text-success-foreground",
        icon: "check",
        bgButton: "bg-success text-success-foreground hover:bg-success-foreground/15",
        color: "text-success-foreground",
    },
    info: {
        container: "bg-info text-info-foreground",
        icon: "information-2",
        bgButton: "bg-info text-info-foreground hover:bg-info-foreground/15",
        color: "text-info-foreground",
    },
    warning: {
        container: "bg-warning text-warning-foreground",
        icon: "alert",
        bgButton: "bg-warning text-warning-foreground hover:bg-warning-foreground/15",
        color: "text-warning-foreground",
    },
    destructive: {
        container: "bg-destructive text-destructive-foreground",
        icon: "bug",
        bgButton: "bg-destructive text-destructive-foreground hover:bg-destructive-foreground/15",
        color: "text-destructive-foreground",
    },
    default: {
        container: "bg-background text-primary",
        icon: "bell",
        bgButton: "bg-background text-primary hover:bg-primary/15",
        color: "text-primary",
    },
};

@Pipe({
    name: "aiToast",
})
export class AiToastPipe implements PipeTransform {
    transform(config: AiToastConfig): ToastVariant {
        const baseVariant = variantMap[config.type] || variantMap["default"];
        if (config.type === "default" && config.icon) {
            return { ...baseVariant, icon: config.icon };
        }
        return baseVariant;
    }
}
