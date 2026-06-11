import { ClassValue } from "clsx";

import { ChangeDetectionStrategy, Component, computed, input, output, signal, ViewEncapsulation } from "@angular/core";

import { mergeClasses } from "../../core";
import { AiTreeNodeComponent } from "./tree-node";
import { AiTreeNode } from "./tree.interface";
import { treeVariants } from "./tree.variants";

@Component({
    selector: "ai-tree",
    exportAs: "aiTree",
    imports: [AiTreeNodeComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        @for (node of nodes(); track node.label) {
            <ai-tree-node [node]="node" [selectedNode]="selected()" (nodeSelected)="onNodeSelected($event)" (nodeToggled)="nodeToggle.emit($event)" />
        }
    `,
    host: {
        "[class]": "classes()",
    },
})
export class AiTree {
    readonly nodes = input.required<AiTreeNode[]>();
    readonly class = input<ClassValue>("");

    readonly nodeSelect = output<AiTreeNode>();
    readonly nodeToggle = output<AiTreeNode>();

    readonly selected = signal<AiTreeNode | null>(null);

    protected readonly classes = computed(() => mergeClasses(treeVariants(), this.class()));

    onNodeSelected(node: AiTreeNode) {
        this.selected.set(node);
        this.nodeSelect.emit(node);
    }
}
