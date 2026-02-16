import { DemoTextareaDefaultComponent } from "./default";
import { DemoTextareaDisabledComponent } from "./disabled";
import { DemoTextareaResizeComponent } from "./resize";
import { DemoTextareaValidationComponent } from "./validation";
import { DemoTextareaVariantComponent } from "./variant";

export const TEXTAREA = {
    componentName: "textarea",
    componentType: "textarea",
    examples: [
        {
            name: "default",
            component: DemoTextareaDefaultComponent,
        },
        {
            name: "variant",
            component: DemoTextareaVariantComponent,
        },
        {
            name: "resize",
            component: DemoTextareaResizeComponent,
        },
        {
            name: "validation",
            component: DemoTextareaValidationComponent,
        },
        {
            name: "disabled",
            component: DemoTextareaDisabledComponent,
        },
    ],
};
