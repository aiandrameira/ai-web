import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";

import { AiIcon } from "../icon.component";

@Component({
    selector: "ai-demo-icon-type",
    imports: [AiIcon],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="w-125 flex items-center gap-x-2  justify-center">
            <ai-icon icon="heart" type="fill" />
            <ai-icon icon="heart" type="line" />
        </div>
    `,
})
export class DemoIconTypeComponent {}
