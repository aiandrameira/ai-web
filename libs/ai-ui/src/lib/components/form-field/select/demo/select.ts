import { DemoSelectDefaultComponent } from "./default";
import { DemoSelectMultipleComponent } from "./multiple";

export const SELECT = {
    componentName: "select",
    componentType: "select",
    examples: [
        {
            name: "default",
            component: DemoSelectDefaultComponent,
        },
        {
            name: "multiple",
            component: DemoSelectMultipleComponent,
        },
    ],
};
