import { Component } from "@angular/core";

import { AiButton } from "../../button";
import { AiStep, AiStepper } from "../stepper";

@Component({
    imports: [AiStepper, AiStep, AiButton],
    template: `
        <div class="w-full max-w-xl">
            <ai-stepper #stepper="aiStepper" linear>
                <ai-step label="Identificação">
                    <div class="flex flex-col gap-y-4 pt-4">
                        <span>Identificação</span>

                        <div class="flex items-center justify-end">
                            <button ai-button (click)="stepper.next()">Próximo</button>
                        </div>
                    </div>
                </ai-step>

                <ai-step label="Contestação">
                    <div class="flex flex-col gap-y-4 pt-4">
                        <span>Contestação</span>

                        <div class="flex items-center gap-x-2 justify-end">
                            <button ai-button variant="outline" (click)="stepper.previous()">Voltar</button>
                            <button ai-button (click)="stepper.next()">Próximo</button>
                        </div>
                    </div>
                </ai-step>

                <ai-step label="Resumo">
                    <div class="flex flex-col gap-y-4 pt-4">
                        <span>Final</span>

                        <div class="flex items-center justify-end">
                            <button ai-button variant="outline" (click)="stepper.previous()">Voltar</button>
                        </div>
                    </div>
                </ai-step>
            </ai-stepper>
        </div>
    `,
})
export class DemoStepperDefaultComponent {}
