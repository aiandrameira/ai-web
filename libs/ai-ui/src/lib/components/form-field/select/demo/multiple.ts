import { Component, signal } from "@angular/core";
import { AiBadge } from "../../../badge";
import { AiSelectImports } from "../select.imports";

@Component({
    imports: [AiSelectImports, AiBadge],
    template: `
        <div class="flex flex-col gap-y-4">
            <div class="flex items-center gap-x-2">
                @for (item of selectedItems(); track $index) {
                <ai-badge variant="primary" class="w-max">
                    {{ item }}
                </ai-badge>
                }
            </div>

            <ai-select class="w-75" placeholder="selected options" [multiple]="true" [maxLabelCount]="4" [(value)]="selectedItems">
                <ai-select-item value="option1">Option 1</ai-select-item>
                <ai-select-item value="option2">Option 2</ai-select-item>
                <ai-select-item value="option3">Option 3</ai-select-item>
                <ai-select-item value="option4">Option 4</ai-select-item>
                <ai-select-item value="option5">Option 5</ai-select-item>
                <ai-select-item value="option6">Option 6</ai-select-item>
            </ai-select>
        </div>
    `,
})
export class DemoSelectMultipleComponent {
    selectedItems = signal<string[]>([]);
}
