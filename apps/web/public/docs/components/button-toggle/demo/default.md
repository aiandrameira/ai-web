```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";

import { AiIconType } from "../../icon/icons";
import { AiButtonToggle, AiButtonToggleItem } from "../button-toggle";

@Component({
    imports: [AiButtonToggle],
    template: `
        <div class="flex flex-col gap-y-4 w-full max-w-sm">
            <ai-button-toggle mode="multiple" [defaultValue]="['italic']" variant="primary" [items]="items" (changeValue)="onToggleChange($event)" />
            <ai-button-toggle mode="multiple" [defaultValue]="['italic']" variant="outline" [items]="items" (changeValue)="onToggleOutlineChange($event)" />
        </div>
    `,
})
export class DemoButtonToggleDefaultComponent {
    items: AiButtonToggleItem[] = [
        { value: "bold", icon: "bold" as AiIconType, label: "Negrito" },
        { value: "italic", icon: "italic" as AiIconType, label: "Itálico" },
        { value: "underline", icon: "underline" as AiIconType, label: "Sublinhado" },
    ];

    onToggleChange(value: string | string[]): void {
        console.log("Button Toggle Value:", value);
    }

    onToggleOutlineChange(value: string | string[]): void {
        console.log("Button Toggle Value:", value);
    }
}
```
