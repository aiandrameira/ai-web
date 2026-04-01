import { AiIconType } from "../icon";

export interface AiTreeNode<T = unknown> {
    label: string;
    icon?: AiIconType;
    data?: T;
    expanded?: boolean;
    selected?: boolean;
    children?: AiTreeNode<T>[];
}
