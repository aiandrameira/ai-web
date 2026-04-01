import { Component } from "@angular/core";

import { AiIconType } from "../../../icon";
import { AiSegmented } from "../segmented";
import { AiSegmentedItem } from "../segmented.interface";

@Component({
    imports: [AiSegmented],
    template: `
        <div class="flex flex-col gap-6">
            <div class="flex flex-col gap-2">
                <span class="text-sm font-medium">Small:</span>
                <ai-segmented [items]="items" size="sm" [defaultValue]="'left'" />
            </div>

            <div class="flex flex-col gap-2">
                <span class="text-sm font-medium">Normal (padrão):</span>
                <ai-segmented [items]="items" size="normal" [defaultValue]="'center'" />
            </div>

            <div class="flex flex-col gap-2">
                <span class="text-sm font-medium">Large:</span>
                <ai-segmented [items]="items" size="lg" [defaultValue]="'right'" />
            </div>
        </div>
    `,
})
export class DemoSegmentedSizeComponent {
    items: AiSegmentedItem[] = [
        { value: "left", icon: "align-left" as AiIconType },
        { value: "center", icon: "align-center" as AiIconType },
        { value: "right", icon: "align-right" as AiIconType },
        { value: "justify", icon: "align-justify" as AiIconType },
    ];
}
