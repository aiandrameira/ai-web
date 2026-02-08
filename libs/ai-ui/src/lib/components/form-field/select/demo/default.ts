import { Component } from "@angular/core";
import { AiBadge } from "../../../badge";
import { AiSelectImports } from "../select.imports";

@Component({
    imports: [AiSelectImports, AiBadge],
    template: `
        <div class="flex flex-col gap-y-4">
            @if (selectValue) {
            <ai-badge variant="primary" class="w-max">
                {{ selectValue }}
            </ai-badge>
            }

            <ai-select class="w-75" placeholder="selected options" [(value)]="selectValue">
                <ai-select-item value="option1">Option 1</ai-select-item>
                <ai-select-item value="option2">Option 2</ai-select-item>
                <ai-select-item value="option3">Option 3</ai-select-item>
            </ai-select>
        </div>
    `,
})
export class DemoSelectDefaultComponent {
    selectValue = "";
}
