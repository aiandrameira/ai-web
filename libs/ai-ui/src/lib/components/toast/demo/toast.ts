import { DemoToastDefaultComponent } from "./default";
import { DemoToastPositionComponent } from "./position";
import { DemoToastTypeComponent } from "./type";

export const TOAST = {
    componentName: "toast",
    componentType: "toast",
    examples: [
        {
            name: "default",
            component: DemoToastDefaultComponent,
        },
        {
            name: "position",
            component: DemoToastPositionComponent,
        },
        {
            name: "type",
            component: DemoToastTypeComponent,
        },
    ],
};
