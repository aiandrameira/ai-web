import { AiIconType } from "../icon/icons";
import { AiCommandItem } from "./command-item";

export interface AiCommandItemConfig {
    value: string | unknown;
    label: string;
    disabled?: boolean;
    command?: string;
    shortcut?: string;
    icon?: AiIconType;
    action?: () => void;
    key?: string;
}

export interface AiCommandGroup {
    label: string;
    items: AiCommandItemConfig[];
}

export interface AiCommandConfig {
    placeholder?: string;
    emptyText?: string;
    groups: AiCommandGroup[];
    dividers?: boolean;
    onSelect?: (item: AiCommandItemConfig) => void;
}

export abstract class AiCommandRepository {
    abstract register(item: AiCommandItem): void;
    abstract unregister(item: AiCommandItem): void;
}
