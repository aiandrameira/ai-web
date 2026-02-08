import { Component } from "@angular/core";
import { AiBadge } from "../../badge";
import { AiAlert } from "../alert";

@Component({
    imports: [AiAlert, AiBadge],
    template: `
        <div class="flex flex-col w-150 items-center gap-4">
            <ai-alert variant="primary" appearance="fill" [title]="title" [description]="description" />
            <ai-alert variant="primary" appearance="soft" [title]="title" [description]="description" />
            <ai-alert variant="primary" appearance="outline" [title]="title" [description]="description" />

            <ai-alert class="relative" variant="primary" appearance="soft" [title]="title" [description]="description">
                <ai-badge variant="primary" class="absolute right-3 top-3">2</ai-badge>
            </ai-alert>
        </div>
    `,
})
export class DemoAlertPrimaryComponent {
    title = "Primary alert!";
    description = "Lorem ipsum dolor sit, amet consectetur adipisicing elit.";
}
