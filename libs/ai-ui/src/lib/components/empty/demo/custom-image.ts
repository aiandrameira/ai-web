import { Component } from "@angular/core";
import { AiButton } from "../../button";
import { AiEmpty } from "../empty";

@Component({
    imports: [AiEmpty, AiButton],
    template: `
        <div class="flex flex-col gap-y-4">
            <ai-empty
                image="./img/avatar/01.png"
                title="User invisible"
                description="This user is currently offline. You can leave a message to notify them or try again later."
                [actions]="[actionPrimary]"
                class="[&_img]:size-12 [&_img]:rounded-full [&_img]:grayscale"
            >
                <ng-template #actionPrimary>
                    <ai-button type="button" size="sm"> Leave Message </ai-button>
                </ng-template>
            </ai-empty>
        </div>
    `,
})
export class DemoEmptyCustomImageComponent {}
