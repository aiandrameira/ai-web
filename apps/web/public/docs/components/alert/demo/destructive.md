```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";
import { AiAlert } from "../alert";

@Component({
    imports: [AiAlert],
    template: `
        <div class="flex flex-col w-150 items-center gap-4">
            <ai-alert variant="destructive" appearance="fill" [title]="title" [description]="description" />
            <ai-alert variant="destructive" appearance="soft" [title]="title" [description]="description" />
            <ai-alert variant="destructive" appearance="outline" [title]="title" [description]="description" />
        </div>
    `,
})
export class DemoAlertDestructiveComponent {
    title = "Error alert!";
    description = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, sint.";
}
```
