```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AiCheckbox } from "../checkbox";

@Component({
    imports: [AiCheckbox, FormsModule],
    template: `
        <div class="flex items-center justify-center gap-x-4 w-full max-w-sm">
            <ai-checkbox variant="destructive" />
            <ai-checkbox variant="destructive" [checked]="state">Checkbox</ai-checkbox>
        </div>
    `,
})
export class DemoCheckboxDestructiveComponent {
    state = true;
}
```
