```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";
import { AiAlert } from "../alert";

@Component({
    imports: [AiAlert],
    template: `
        <div class="flex flex-col w-150 items-center gap-4">
            <ai-alert icon="stack" variant="primary" appearance="fill" [title]="title" [description]="description" />
            <ai-alert icon="stack" variant="primary" appearance="soft" [title]="title" [description]="description" />
            <ai-alert icon="stack" variant="primary" appearance="outline" [title]="title" [description]="description" />
        </div>
    `,
})
export class DemoAlertIconComponent {
    title = "Icon alert!";
    description = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, sint.";
}
```
