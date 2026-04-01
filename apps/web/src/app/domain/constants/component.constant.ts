import {
    ALERT,
    ALERT_DIALOG,
    AUTOCOMPLETE,
    AVATAR,
    BADGE,
    BREADCRUMB,
    BUTTON,
    BUTTON_TOGGLE,
    CARD,
    CHECKBOX,
    COMMAND,
    DATE_PICKER,
    DATETIME,
    DIALOG,
    EMPTY,
    FLOAT_BUTTON,
    ICON,
    INPUT,
    LOADER,
    MARKDOWN,
    PAGINATION,
    RADIO,
    SEGMENTED,
    SELECT,
    SEPARATOR,
    SWITCH,
    TABLE,
    TEXTAREA,
    TOAST,
    TOOLTIP,
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

const dataComponents: ComponentData[] = [
    ALERT,
    ALERT_DIALOG,
    AVATAR,
    BADGE,
    BREADCRUMB,
    BUTTON,
    BUTTON_TOGGLE,
    CARD,
    COMMAND,
    DATE_PICKER,
    DIALOG,
    EMPTY,
    FLOAT_BUTTON,
    ICON,
    LOADER,
    MARKDOWN,
    PAGINATION,
    SEPARATOR,
    TABLE,
    TOAST,
    TOOLTIP,
];
const formComponents: ComponentData[] = [AUTOCOMPLETE, CHECKBOX, DATETIME, INPUT, RADIO, SEGMENTED, SELECT, SWITCH, TEXTAREA];

export const components = [...dataComponents, ...formComponents];
