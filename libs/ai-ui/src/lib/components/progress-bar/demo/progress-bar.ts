import { DemoProgressBarIndeterminateComponent } from "./indeterminate";
import { DemoProgressBarShapeComponent } from "./shape";
import { DemoProgressBarSizeComponent } from "./size";
import { DemoProgressBarVariantComponent } from "./variant";

export const PROGRESS_BAR = {
    componentName: "progress-bar",
    examples: [
        { name: "variant", component: DemoProgressBarVariantComponent },
        { name: "size", component: DemoProgressBarSizeComponent },
        { name: "shape", component: DemoProgressBarShapeComponent },
        { name: "indeterminate", component: DemoProgressBarIndeterminateComponent },
    ],
};

export { DemoProgressBarIndeterminateComponent, DemoProgressBarShapeComponent, DemoProgressBarSizeComponent, DemoProgressBarVariantComponent };
