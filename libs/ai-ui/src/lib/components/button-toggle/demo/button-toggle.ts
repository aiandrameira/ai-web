import { DemoButtonToggleDefaultComponent } from "./default";
import { DemoButtonToggleDisabledComponent } from "./disabled";
import { DemoButtonToggleSizeComponent } from "./size";

export const BUTTON_TOGGLE = {
    componentName: "button-toggle",
    componentType: "button-toggle",
    examples: [
        {
            name: "default",
            component: DemoButtonToggleDefaultComponent,
        },
        {
            name: "size",
            component: DemoButtonToggleSizeComponent,
        },
        {
            name: "disabled",
            component: DemoButtonToggleDisabledComponent,
        },
    ],
};
