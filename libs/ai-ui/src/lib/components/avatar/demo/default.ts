import { Component } from "@angular/core";

import { AiAvatar } from "../avatar";
import { AiAvatarGroup } from "../avatar-group";

@Component({
    selector: "ai-demo-avatar-default",
    imports: [AiAvatar, AiAvatarGroup],
    template: `
        <div class="flex justify-center items-center gap-x-4">
            <ai-avatar image="./img/avatar.png" fallback="AI" [size]="32" />
            <ai-avatar fallback="AI" size="sm" />

            <ai-avatar-group>
                <ai-avatar image="https://raw.githubusercontent.com/aiandralves/smart-watch/refs/heads/main/assets/img/team/person2.jpg" fallback="AI" size="sm" />
                <ai-avatar image="https://raw.githubusercontent.com/aiandralves/smart-watch/refs/heads/main/assets/img/team/person4.jpg" fallback="AI" size="sm" />
                <ai-avatar image="https://avatars.githubusercontent.com/u/33138081?v=4" fallback="AI" size="sm" />
            </ai-avatar-group>
        </div>
    `,
})
export class DemoAvatarDefaultComponent {}
