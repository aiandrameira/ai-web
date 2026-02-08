import { DemoCheckboxDefaultComponent } from "./default";
import { DemoCheckboxDisabledComponent } from "./disabled";
import { DemoCheckboxShapeComponent } from "./shape";
import { DemoCheckboxSizeComponent } from "./size";
import { DemoCheckboxValidationComponent } from "./validation";

export const CHECKBOX = {
    componentName: "checkbox",
    componentType: "checkbox",
    examples: [
        {
            name: "default",
            component: DemoCheckboxDefaultComponent,
        },
        {
            name: "size",
            component: DemoCheckboxSizeComponent,
        },
        {
            name: "shape",
            component: DemoCheckboxShapeComponent,
        },
        {
            name: "disabled",
            component: DemoCheckboxDisabledComponent,
        },
        {
            name: "validation",
            component: DemoCheckboxValidationComponent,
        },
    ],
};
