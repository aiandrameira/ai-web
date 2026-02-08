import { DemoFloatButtonGroupComponent } from "./float-group";
import { DemoFloatButtonTopComponent } from "./float-top";
import { DemoFloatButtonPositionComponent } from "./position";
import { DemoFloatButtonShapeComponent } from "./shape";
import { DemoFloatButtonSizeComponent } from "./size";
import { DemoFloatButtonVariantComponent } from "./variant";

export const FLOAT_BUTTON = {
    componentName: "float-button",
    componentType: "float-button",
    examples: [
        {
            name: "variant",
            component: DemoFloatButtonVariantComponent,
        },
        {
            name: "shape",
            component: DemoFloatButtonShapeComponent,
        },
        {
            name: "size",
            component: DemoFloatButtonSizeComponent,
        },
        {
            name: "position",
            component: DemoFloatButtonPositionComponent,
        },
        {
            name: "float-group",
            component: DemoFloatButtonGroupComponent,
        },
        {
            name: "float-top",
            component: DemoFloatButtonTopComponent,
        },
    ],
};
