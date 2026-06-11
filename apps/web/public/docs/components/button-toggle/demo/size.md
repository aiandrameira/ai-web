```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";

import { AiIconType } from "../../icon/icons";
import { AiButtonToggle, AiButtonToggleItem } from "../button-toggle";

@Component({
    selector: "ai-demo-button-toggle-size",
    imports: [AiButtonToggle],
    template: `
        <div class="flex flex-col gap-y-4 w-full">
            <div class="grid grid-cols-2 gap-2 sm:gap-4">
                <span class="font-semibold text-sm">Small</span>
                <ai-button-toggle mode="multiple" [defaultValue]="['italic']" variant="outline" [items]="items" size="sm" />
            </div>
            <div class="grid grid-cols-2 gap-2 sm:gap-4">
                <span class="font-semibold text-sm">Default</span>
                <ai-button-toggle mode="multiple" [defaultValue]="['italic']" variant="outline" [items]="items" size="default" />
            </div>
            <div class="grid grid-cols-2 gap-2 sm:gap-4">
                <span class="font-semibold text-sm">Large</span>
                <ai-button-toggle mode="multiple" [defaultValue]="['italic']" variant="outline" [items]="items" size="lg" />
            </div>
        </div>
    `,
})
export class DemoButtonToggleSizeComponent {
    items: AiButtonToggleItem[] = [
        { value: "bold", icon: "bold" as AiIconType },
        { value: "italic", icon: "italic" as AiIconType },
        { value: "underline", icon: "underline" as AiIconType },
    ];
}
```
