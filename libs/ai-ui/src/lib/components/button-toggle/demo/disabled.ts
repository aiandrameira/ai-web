import { Component } from "@angular/core";

import { AiIconType } from "../../icon/icons";
import { AiButtonToggle, AiButtonToggleItem } from "../button-toggle";

@Component({
    selector: "ai-demo-button-toggle-disabled",
    imports: [AiButtonToggle],
    template: `
        <div class="flex flex-col gap-y-4 w-full max-w-sm">
            <ai-button-toggle mode="multiple" [defaultValue]="['italic']" variant="primary" [items]="items" disabled />
        </div>
    `,
})
export class DemoButtonToggleDisabledComponent {
    items: AiButtonToggleItem[] = [
        { value: "bold", icon: "bold" as AiIconType, label: "Negrito" },
        { value: "italic", icon: "italic" as AiIconType, label: "Itálico" },
        { value: "underline", icon: "underline" as AiIconType, label: "Sublinhado" },
    ];
}
