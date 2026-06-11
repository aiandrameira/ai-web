```angular-ts showLineNumbers copyButton
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";

import { AiIcon } from "../icon.component";

@Component({
    selector: "ai-demo-icon-size",
    imports: [AiIcon],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="w-125 flex items-center gap-x-2 justify-center">
            <ai-icon icon="heart" size="sm" />
            <ai-icon icon="heart" size="default" />
            <ai-icon icon="heart" size="lg" />
            <ai-icon icon="heart" size="xl" />
        </div>
    `,
})
export class DemoIconSizeComponent {}
```
