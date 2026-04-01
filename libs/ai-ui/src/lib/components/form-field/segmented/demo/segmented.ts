import { DemoSegmentedDefaultComponent } from "./default";
import { DemoSegmentedDisabledComponent } from "./disabled";
import { DemoSegmentedSizeComponent } from "./size";

export const SEGMENTED = {
    componentName: "segmented",
    examples: [
        {
            name: "default",
            component: DemoSegmentedDefaultComponent,
        },
        {
            name: "disabled",
            component: DemoSegmentedDisabledComponent,
        },
        {
            name: "size",
            component: DemoSegmentedSizeComponent,
        },
    ],
};
