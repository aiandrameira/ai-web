import { Component } from "@angular/core";
import { AiAvatar } from "../avatar";

@Component({
    imports: [AiAvatar],
    template: `
        <div class="flex justify-center items-center gap-x-4">
            <ai-avatar image="./img/avatar/01.png" fallback="AI" size="lg" status="invisible" />
            <ai-avatar image="./img/avatar/01.png" fallback="AI" size="lg" status="online" />
            <ai-avatar image="./img/avatar/01.png" fallback="AI" size="lg" status="doNotDisturb" />
            <ai-avatar image="./img/avatar/01.png" fallback="AI" size="lg" status="away" />
        </div>
    `,
})
export class DemoAvatarStatusComponent {}
