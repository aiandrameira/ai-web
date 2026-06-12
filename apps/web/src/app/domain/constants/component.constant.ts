import {
    ACCORDION,
    ALERT,
    ALERT_DIALOG,
    AUTOCOMPLETE,
    AVATAR,
    BADGE,
    BREADCRUMB,
    BUTTON,
    BUTTON_TOGGLE,
    CARD,
    CAROUSEL,
    CHECKBOX,
    COMMAND,
    DATE_PICKER,
    DATETIME,
    DIALOG,
    DRAWER,
    EMPTY,
    FLOAT_BUTTON,
    ICON,
    INPUT,
    LOADER,
    MARKDOWN,
    MENU,
    PAGINATION,
    POPOVER,
    PROGRESS_BAR,
    RADIO,
    SEGMENTED,
    SELECT,
    SEPARATOR,
    SKELETON,
    STEPPER,
    SWITCH,
    TABLE,
    TABS,
    TEXTAREA,
    TOAST,
    TOOLTIP,
    TREE,
    UPLOAD,
} from "@ai-ui/components";
import { ComponentType } from "@angular/cdk/overlay";

export interface ExampleData {
    name: string;
    type?: string;
    column?: boolean;
    component: ComponentType<unknown>;
    demo?: boolean;
}

export interface ComponentData {
    componentName: string;
    examples: ExampleData[];
    fullWidth?: boolean;
}

export const dataComponents: ComponentData[] = [
    ACCORDION,
    ALERT,
    ALERT_DIALOG,
    AVATAR,
    BADGE,
    BREADCRUMB,
    BUTTON,
    BUTTON_TOGGLE,
    CARD,
    CAROUSEL,
    COMMAND,
    DATE_PICKER,
    DIALOG,
    DRAWER,
    EMPTY,
    FLOAT_BUTTON,
    ICON,
    LOADER,
    MARKDOWN,
    MENU,
    POPOVER,
    PAGINATION,
    PROGRESS_BAR,
    SEPARATOR,
    SKELETON,
    STEPPER,
    TABLE,
    TABS,
    TOAST,
    TOOLTIP,
    TREE,
    UPLOAD,
];
export const formComponents: ComponentData[] = [AUTOCOMPLETE, CHECKBOX, DATETIME, INPUT, RADIO, SEGMENTED, SELECT, SWITCH, TEXTAREA];

export const components = [...dataComponents, ...formComponents];
