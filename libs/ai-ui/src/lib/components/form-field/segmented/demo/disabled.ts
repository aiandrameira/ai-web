import { Component } from "@angular/core";

import { AiSegmented } from "../segmented";
import { AiSegmentedItem } from "../segmented.interface";

@Component({
    imports: [AiSegmented],
    template: `
        <div class="flex flex-col gap-6">
            <div class="flex flex-col gap-2">
                <span class="text-sm font-medium">Grupo desabilitado:</span>
                <ai-segmented [items]="items" [disabled]="true" [defaultValue]="'option1'" />
            </div>

            <div class="flex flex-col gap-2">
                <span class="text-sm font-medium">Item individual desabilitado:</span>
                <ai-segmented [items]="itemsWithDisabled" [defaultValue]="'option1'" />
            </div>
        </div>
    `,
})
export class DemoSegmentedDisabledComponent {
    items: AiSegmentedItem[] = [
        { value: "option1", label: "Opção 1" },
        { value: "option2", label: "Opção 2" },
        { value: "option3", label: "Opção 3" },
    ];

    itemsWithDisabled: AiSegmentedItem[] = [
        { value: "option1", label: "Opção 1" },
        { value: "option2", label: "Opção 2", disabled: true },
        { value: "option3", label: "Opção 3" },
    ];
}
