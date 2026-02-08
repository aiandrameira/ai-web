import { Component } from "@angular/core";
import { AiAvatar, AiAvatarGroup } from "../../avatar";
import { AiButton } from "../../button";
import { AiEmpty } from "../empty";

@Component({
    imports: [AiEmpty, AiAvatar, AiAvatarGroup, AiButton],
    template: `
        <div class="flex flex-col gap-y-12">
            <ai-empty [image]="customImage" [title]="customTitle" description="Invite your team to collaborate on this project." [actions]="[actionInvite]">
                <ng-template #customImage>
                    <ai-avatar-group>
                        <ai-avatar image="./img/avatar/01.png" size="md" class="grayscale"></ai-avatar>
                        <ai-avatar image="./img/avatar/02.jpg" size="md" class="grayscale"></ai-avatar>
                        <ai-avatar image="./img/avatar/aiandra.jpg" size="md" class="grayscale"></ai-avatar>
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
