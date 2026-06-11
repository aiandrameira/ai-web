import { Component } from "@angular/core";

import { AiAvatar } from "../avatar";

@Component({
    selector: "ai-demo-avatar-size",
    imports: [AiAvatar],
    template: `
        <div class="flex items-center gap-x-2 sm:gap-x-4">
            <ai-avatar image="./img/avatar.png" fallback="AI" size="xs" />
            <ai-avatar image="./img/avatar.png" fallback="AI" size="sm" />
            <ai-avatar image="./img/avatar.png" fallback="AI" size="default" />
            <ai-avatar image="./img/avatar.png" fallback="AI" size="md" />
            <ai-avatar image="./img/avatar.png" fallback="AI" size="lg" />
            <ai-avatar image="./img/avatar.png" fallback="AI" size="xl" />
        </div>
    `,
})
export class DemoAvatarSizeComponent {}
