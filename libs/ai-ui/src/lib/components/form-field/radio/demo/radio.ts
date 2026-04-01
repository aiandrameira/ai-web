import { DemoRadioDefaultComponent } from "./default";
import { DemoRadioDisabledComponent } from "./disabled";
import { DemoRadioSizeComponent } from "./size";
import { DemoRadioValidationComponent } from "./validation";

export const RADIO = {
    componentName: "radio",
    examples: [
        {
            name: "default",
            component: DemoRadioDefaultComponent,
        },
        {
            name: "size",
            component: DemoRadioSizeComponent,
        },
        {
            name: "disabled",
            component: DemoRadioDisabledComponent,
        },
        {
            name: "validation",
            component: DemoRadioValidationComponent,
        },
    ],
};
