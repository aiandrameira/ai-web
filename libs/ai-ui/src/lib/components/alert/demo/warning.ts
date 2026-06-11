import { Component } from "@angular/core";

import { AiAlert } from "../alert";

@Component({
    selector: "ai-demo-alert-warning",
    imports: [AiAlert],
    template: `
        <div class="flex flex-col w-70 sm:w-100 lg:w-150 items-center gap-4">
            <ai-alert variant="warning" appearance="fill" [title]="title" [description]="description" />
            <ai-alert variant="warning" appearance="soft" [title]="title" [description]="description" />
            <ai-alert variant="warning" appearance="outline" [title]="title" [description]="description" />
        </div>
    `,
})
export class DemoAlertWarningComponent {
    title = "Warning alert!";
    description = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, sint.";
}
