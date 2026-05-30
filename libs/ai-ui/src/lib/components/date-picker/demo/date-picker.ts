import { DemoDatePickerDefaultComponent } from "./default";
import { DemoDatePickerDisabledComponent } from "./disabled";
import { DemoDatePickerRangeComponent } from "./range";

export const DATE_PICKER = {
    componentName: "date-picker",
    examples: [
        {
            name: "default",
            component: DemoDatePickerDefaultComponent,
        },
        {
            name: "range",
            component: DemoDatePickerRangeComponent,
        },
        {
            name: "disabled",
            component: DemoDatePickerDisabledComponent,
        },
    ],
};
