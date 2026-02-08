import { DemoCardDefaultComponent } from "./default";
import { DemoCardDisabledComponent } from "./disabled";

export const CARD = {
    componentName: "card",
    componentType: "card",
    examples: [
        {
            name: "default",
            component: DemoCardDefaultComponent,
        },
        {
            name: "disabled",
            component: DemoCardDisabledComponent,
        },
    ],
};
