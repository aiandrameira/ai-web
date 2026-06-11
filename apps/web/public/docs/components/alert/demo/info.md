```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";

import { AiAlert } from "../alert";

@Component({
    selector: "ai-demo-alert-info",
    imports: [AiAlert],
    template: `
        <div class="flex flex-col w-70 sm:w-100 lg:w-150 items-center gap-4">
            <ai-alert variant="info" appearance="fill" [title]="title" [description]="description" />
            <ai-alert variant="info" appearance="soft" [title]="title" [description]="description" />
            <ai-alert variant="info" appearance="outline" [title]="title" [description]="description" />
        </div>
    `,
})
export class DemoAlertInfoComponent {
    title = "Info alert!";
    description = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, sint.";
}
```
