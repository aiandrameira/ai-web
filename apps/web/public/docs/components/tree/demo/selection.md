```angular-ts showLineNumbers copyButton
import { Component, signal } from "@angular/core";

import { AiIconType } from "../../icon";
import { AiTree } from "../tree";
import { AiTreeNode } from "../tree.interface";

@Component({
    selector: "ai-demo-tree-selection",
    imports: [AiTree],
    template: `
        <div class="flex flex-col gap-4 w-full max-w-xs">
            <ai-tree [nodes]="nodes" (nodeSelect)="onSelect($event)" />
            @if (selected()) {
                <p class="text-sm text-muted-foreground">
                    Selecionado: <span class="text-foreground font-medium">{{ selected() }}</span>
                </p>
            }
        </div>
    `,
})
export class DemoTreeSelectionComponent {
    selected = signal("");

    nodes: AiTreeNode[] = [
        {
            label: "Documentos",
            icon: "folder",
            expanded: true,
            children: [
                { label: "Relatório.pdf", icon: "file-text" as AiIconType },
                { label: "Planilha.xlsx", icon: "file-list-3" as AiIconType },
            ],
        },
        {
            label: "Imagens",
            icon: "folder",
            children: [
                { label: "foto.jpg", icon: "image" as AiIconType },
                { label: "banner.png", icon: "image" as AiIconType },
            ],
        },
    ];

    onSelect(node: AiTreeNode) {
        this.selected.set(node.label);
    }
}
```
