import { Component } from "@angular/core";
import { AiButton } from "../button";

@Component({
    imports: [AiButton],
    template: `
        <div class="flex items-center justify-center gap-x-2">
            <ai-button size="default">default</ai-button>
            <ai-button shape="circle">circle</ai-button>
        </div>
    `,
})
export class DemoButtonShapeComponent {}
