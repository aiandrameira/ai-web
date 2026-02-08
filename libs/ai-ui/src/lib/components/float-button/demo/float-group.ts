import { Component } from "@angular/core";
import { AiFloatButton } from "../float-button";
import { AiFloatButtonGroup } from "../float-button-group";

@Component({
    imports: [AiFloatButton, AiFloatButtonGroup],
    template: `
        <div class="flex items-center gap-x-2">
            <ai-float-button-group variant="primary" childrenPosition="left" icon="add" trigger="click">
                <ai-float-button variant="accent" icon="edit" />
                <ai-float-button variant="default" icon="share" />
                <ai-float-button variant="primary" icon="stack" />
            </ai-float-button-group>

            <ai-float-button-group variant="primary" icon="add" trigger="hover">
                <ai-float-button variant="accent" icon="edit" />
                <ai-float-button variant="default" icon="share" />
                <ai-float-button variant="primary" icon="stack" />
            </ai-float-button-group>
        </div>
    `,
})
export class DemoFloatButtonGroupComponent {}
