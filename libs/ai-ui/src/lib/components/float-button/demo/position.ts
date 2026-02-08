import { Component } from "@angular/core";
import { AiFloatButton } from "../float-button";

@Component({
    imports: [AiFloatButton],
    template: `
        <div class="flex items-center gap-x-2">
            <ai-float-button variant="primary" position="top-left" icon="corner-up-left" />
            <ai-float-button variant="primary" position="top-right" icon="corner-up-right" />
            <ai-float-button variant="primary" position="bottom-left" icon="corner-down-left" />
            <ai-float-button variant="primary" position="bottom-right" icon="corner-down-right" />
        </div>
    `,
})
export class DemoFloatButtonPositionComponent {}
