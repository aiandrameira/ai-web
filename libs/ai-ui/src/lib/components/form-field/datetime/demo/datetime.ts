import { DemoDatetimeDefaultComponent } from "./default";
import { DemoDatetimeDisabledComponent } from "./disabled";
import { DemoDatetimeValidationComponent } from "./validation";

export const DATETIME = {
    componentName: "datetime",
    examples: [
        {
            name: "default",
            component: DemoDatetimeDefaultComponent,
        },
        {
            name: "validation",
            component: DemoDatetimeValidationComponent,
        },
        {
            name: "disabled",
            component: DemoDatetimeDisabledComponent,
        },
    ],
};
