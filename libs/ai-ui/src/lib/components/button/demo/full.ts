import { Component } from "@angular/core";
import { AiButton } from "../button";

@Component({
    imports: [AiButton],
    template: `
        <div class="flex items-center justify-center max-w-sm w-full">
            <ai-button full>Full</ai-button>
        </div>
    `,
})
export class DemoButtonFullComponent {}
