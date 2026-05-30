import { AiIconType } from "../../icon/icons";

export interface AiSegmentedItem {
    value: string;
    label?: string;
    icon?: AiIconType;
    disabled?: boolean;
}
