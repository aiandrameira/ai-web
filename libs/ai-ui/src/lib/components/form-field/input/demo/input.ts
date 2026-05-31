import { DemoInputDefaultComponent } from "./default";
import { DemoInputDisabledComponent } from "./disabled";
import { DemoInputIconComponent } from "./icon";
import { DemoInputMaskComponent } from "./mask";
import { DemoInputNormalizeComponent } from "./normalize";
import { DemoInputPasswordComponent } from "./password";
import { DemoInputValidationComponent } from "./validation";
import { DemoInputVariantComponent } from "./variant";

export const INPUT = {
    componentName: "input",
    componentType: "input",
    examples: [
        { name: "default", component: DemoInputDefaultComponent },
        { name: "variant", component: DemoInputVariantComponent },
        { name: "validation", component: DemoInputValidationComponent },
        { name: "disabled", component: DemoInputDisabledComponent },
        { name: "password", component: DemoInputPasswordComponent },
        { name: "mask", component: DemoInputMaskComponent },
        { name: "normalize", component: DemoInputNormalizeComponent },
        { name: "icon", component: DemoInputIconComponent },
    ],
};
