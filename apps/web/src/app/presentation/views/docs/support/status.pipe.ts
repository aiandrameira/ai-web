import { AiIconType } from "@ai-ui/components";
import { Pipe, PipeTransform } from "@angular/core";

type Status = "active" | "deprecated" | "archived";
type BadgeType = "default" | "outline" | "primary" | "accent" | "destructive" | "info" | "success" | "warning" | null | undefined;

@Pipe({
    name: "statusBadge",
})
export class StatusBadgePipe implements PipeTransform {
    #statusMap: Record<Status, { color: BadgeType; icon: AiIconType }> = {
        active: { color: "success", icon: "checkbox-circle" },
        deprecated: { color: "warning", icon: "alert" },
        archived: { color: "destructive", icon: "archive" },
    };

    transform(status: Status): { color: BadgeType; icon: AiIconType } {
        return this.#statusMap[status] ?? { color: "default", icon: "help" };
    }
}
