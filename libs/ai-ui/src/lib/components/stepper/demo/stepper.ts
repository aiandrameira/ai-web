import { DemoStepperDefaultComponent } from "./default";
import { DemoStepperOrientationComponent } from "./orientation";
import { DemoStepperValidationComponent } from "./validation";

export const STEPPER = {
    componentName: "stepper",
    examples: [
        {
            name: "default",
            component: DemoStepperDefaultComponent,
        },
        {
            name: "orientation",
            component: DemoStepperOrientationComponent,
        },
        {
            name: "validation",
            component: DemoStepperValidationComponent,
        },
    ],
};
