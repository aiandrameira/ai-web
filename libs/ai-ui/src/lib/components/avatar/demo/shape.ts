import { Component } from "@angular/core";

import { AiAvatar } from "../avatar";

@Component({
    selector: "ai-demo-avatar-shape",
    imports: [AiAvatar],
    template: `
        <div class="flex items-center gap-x-4">
            <ai-avatar image="./img/avatar.png" fallback="AI" [size]="32" shape="default" />
            <ai-avatar image="./img/avatar.png" fallback="AI" [size]="32" shape="circle" />
        </div>
    `,
})
export class DemoAvatarShapeComponent {}
