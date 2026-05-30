import { Component } from "@angular/core";

import { AiTree } from "../tree";
import { AiTreeNode } from "../tree.interface";

@Component({
    imports: [AiTree],
    template: `
        <div class="w-full max-w-xs">
            <ai-tree [nodes]="nodes" />
        </div>
    `,
})
export class DemoTreeDefaultComponent {
    nodes: AiTreeNode[] = [
        {
            label: "src",
            icon: "folder",
            expanded: true,
            children: [
                {
                    label: "app",
                    icon: "folder",
                    expanded: true,
                    children: [
                        { label: "app.component.ts", icon: "file-code" },
                        { label: "app.component.html", icon: "file-code" },
                        { label: "app.module.ts", icon: "file-code" },
                    ],
                },
                {
                    label: "assets",
                    icon: "folder",
                    children: [{ label: "logo.svg", icon: "image" }],
                },
                { label: "main.ts", icon: "file-code" },
                { label: "index.html", icon: "file-code" },
            ],
        },
        { label: "package.json", icon: "file-text" },
        { label: "tsconfig.json", icon: "file-settings" },
        { label: "README.md", icon: "markdown" },
    ];
}
