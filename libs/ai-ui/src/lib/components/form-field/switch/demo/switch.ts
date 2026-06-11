import { DemoSwitchDefaultComponent } from "./default";
import { DemoSwitchDisabledComponent } from "./disabled";
import { DemoSwitchSizeComponent } from "./size";

export const SWITCH = {
    componentName: "switch",
    componentType: "switch",
    examples: [
        { name: "default", component: DemoSwitchDefaultComponent },
        { name: "size", component: DemoSwitchSizeComponent },
        { name: "disabled", component: DemoSwitchDisabledComponent },
    ],
};
