import { NgModule } from "@angular/core";

import { AiStep } from "./step";
import { AiStepper } from "./stepper";

const components = [AiStepper, AiStep] as const;
export const AiStepperImports = [...components];

@NgModule({
    imports: [...components],
    exports: [...components],
})
export class AiStepperModule {}
