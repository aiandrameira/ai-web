```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";

import { AiAvatar, AiAvatarGroup } from "../../avatar";
import { AiButton } from "../../button";
import { AiEmpty } from "../empty";

@Component({
    selector: "ai-demo-empty-advanced",
    imports: [AiEmpty, AiAvatar, AiAvatarGroup, AiButton],
    template: `
        <div class="flex flex-col gap-y-12">
            <ai-empty [image]="customImage" [title]="customTitle" description="Invite your team to collaborate on this project." [actions]="[actionInvite]">
                <ng-template #customImage>
                    <ai-avatar-group>
                        <ai-avatar image="https://raw.githubusercontent.com/aiandralves/smart-watch/refs/heads/main/assets/img/team/person2.jpg" size="md" class="grayscale" />
                        <ai-avatar image="https://raw.githubusercontent.com/aiandralves/smart-watch/refs/heads/main/assets/img/team/person4.jpg" size="md" class="grayscale" />
                        <ai-avatar image="https://avatars.githubusercontent.com/u/33138081?v=4" size="md" class="grayscale" />
                    </ai-avatar-group>
                </ng-template>

                <ng-template #customTitle>
                    <span>
                        No team
                        <strong>members</strong>
                    </span>
                </ng-template>

                <ng-template #actionInvite>
                    <ai-button size="sm" icon="user-add"> Invite Members </ai-button>
                </ng-template>
            </ai-empty>
        </div>
    `,
})
export class DemoEmptyAdvancedComponent {}
```
