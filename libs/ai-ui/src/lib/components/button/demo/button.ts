import { DemoButtonDisabledComponent } from "./disabled";
import { DemoButtonFillComponent } from "./fill";
import { DemoButtonFullComponent } from "./full";
import { DemoButtonIconComponent } from "./icon";
import { DemoButtonLoadingComponent } from "./loading";
import { DemoButtonShapeComponent } from "./shape";
import { DemoButtonSizeComponent } from "./size";
import { DemoButtonVariantComponent } from "./variant";

export const BUTTON = {
    componentName: "button",
    componentType: "button",
    examples: [
        { name: "variant", component: DemoButtonVariantComponent },
        { name: "fill", component: DemoButtonFillComponent },
        { name: "size", component: DemoButtonSizeComponent },
        { name: "shape", component: DemoButtonShapeComponent },
        { name: "icon", component: DemoButtonIconComponent },
        { name: "loading", component: DemoButtonLoadingComponent },
        { name: "disabled", component: DemoButtonDisabledComponent },
        { name: "full", component: DemoButtonFullComponent },
    ],
};
