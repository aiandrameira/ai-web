import { ClassValue } from "clsx";

import { ChangeDetectionStrategy, Component, computed, input, output, signal, ViewEncapsulation } from "@angular/core";

import { mergeClasses } from "../../core";
import { AiIcon } from "../icon";
import { AiTreeNode } from "./tree.interface";
import { treeNodeVariants, treeVariants } from "./tree.variants";

@Component({
    selector: "ai-tree-node",
    exportAs: "aiTreeNode",
    imports: [AiIcon],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <button [class]="nodeClasses()" [style.padding-left.px]="depth() * 16 + 6" (click)="onSelect()">
            @if (hasChildren()) {
                <button type="button" class="flex items-center justify-center size-4 shrink-0 cursor-pointer" (click)="onToggle($event)">
                    <ai-icon [icon]="expanded() ? 'arrow-down-s' : 'arrow-right-s'" size="sm" />
                </button>
            } @else {
                <span class="size-4 shrink-0"></span>
            }
            @let icon = node().icon;
            @if (icon) {
                <ai-icon [icon]="icon" size="sm" class="shrink-0" />
            }
            <span class="truncate">{{ node().label }}</span>
        </button>
        @if (hasChildren() && expanded()) {
            @for (child of node().children; track child.label) {
                <ai-tree-node
                    [node]="child"
                    [depth]="depth() + 1"
                    [selectedNode]="selectedNode()"
                    (nodeSelected)="nodeSelected.emit($event)"
                    (nodeToggled)="nodeToggled.emit($event)"
                />
            }
        }
    `,
    host: {
        class: "block",
    },
})
export class AiTreeNodeComponent {
    readonly node = input.required<AiTreeNode>();
    readonly depth = input(0);
    readonly selectedNode = input<AiTreeNode | null>(null);

    readonly nodeSelected = output<AiTreeNode>();
    readonly nodeToggled = output<AiTreeNode>();

    readonly expanded = signal(false);

    readonly hasChildren = computed(() => {
        const children = this.node().children;
        return !!children && children.length > 0;
    });

    protected readonly nodeClasses = computed(() => mergeClasses(treeNodeVariants({ selected: this.selectedNode() === this.node() })));

    constructor() {
        queueMicrotask(() => {
            if (this.node().expanded) {
                this.expanded.set(true);
            }
        });
    }

    onToggle(event: Event) {
        event.stopPropagation();
        this.expanded.update(v => !v);
        this.nodeToggled.emit(this.node());
    }

    onSelect() {
        this.nodeSelected.emit(this.node());
    }
}

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
