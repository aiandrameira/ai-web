import { Component } from "@angular/core";
import { AiButton } from "../../button";
import { AiIcon } from "../../icon";
import { AiEmpty } from "../empty";

@Component({
    imports: [AiEmpty, AiButton, AiIcon],
    template: `
        <div class="flex flex-col gap-y-4">
            <ai-empty
                icon="code-block"
                title="No Projects Yet"
                description="You haven't created any projects yet. Get started by creating your first project."
                [actions]="[actionPrimary, actionDefault]"
            >
                <ng-template #actionPrimary>
                    <ai-button type="button" size="sm"> Create project </ai-button>
                </ng-template>

                <ng-template #actionDefault>
                    <ai-button type="button" size="sm" variant="default"> Import project </ai-button>
                </ng-template>

                <ai-button type="button" size="sm" variant="ghost">
                    Learn more
                    <ai-icon icon="arrow-right-up" size="sm" />
                </ai-button>
            </ai-empty>
        </div>
    `,
})
export class DemoEmptyDefaultComponent {}
