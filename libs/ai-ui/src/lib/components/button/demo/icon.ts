import { Component } from "@angular/core";
import { AiButton } from "../button";

@Component({
    imports: [AiButton],
    template: `
        <div class="flex items-center justify-center">
            <ai-button icon="heart">icon</ai-button>
        </div>
    `,
})
export class DemoButtonIconComponent {}
