import { Component } from "@angular/core";
import { AiFloatButton } from "../float-button";

@Component({
    imports: [AiFloatButton],
    template: `
        <div class="flex items-center gap-x-4">
            <ai-float-button variant="primary" size="default" icon="stack" />
            <ai-float-button variant="primary" size="lg" icon="stack" />
        </div>
    `,
})
export class DemoFloatButtonSizeComponent {}
