import { Component } from "@angular/core";
import { AiButton } from "../button";

@Component({
    imports: [AiButton],
    template: `
        <div class="flex items-center justify-center">
            <ai-button loading>loading</ai-button>
        </div>
    `,
})
export class DemoButtonLoadingComponent {}
