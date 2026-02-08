```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";
import { AiAvatar } from "../avatar";
import { AiAvatarGroup } from "../avatar-group";

@Component({
    imports: [AiAvatar, AiAvatarGroup],
    template: `
        <div class="flex justify-center items-center gap-x-4">
            <ai-avatar image="./img/avatar/01.png" fallback="AI" [size]="32" />
            <ai-avatar image="error-image.png" fallback="AI" size="sm" />

            <ai-avatar-group>
                <ai-avatar image="./img/avatar/01.png" fallback="AI" size="sm" />
                <ai-avatar image="./img/avatar/02.jpg" fallback="AI" size="sm" />
                <ai-avatar image="./img/avatar/aiandra.jpg" fallback="AI" size="sm" />
            </ai-avatar-group>
        </div>
    `,
})
export class DemoAvatarDefaultComponent {}
```
