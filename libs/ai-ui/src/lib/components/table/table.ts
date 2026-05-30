import { ClassValue } from "clsx";

import { NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, contentChildren, effect, input, output, signal, TemplateRef, ViewEncapsulation } from "@angular/core";

import { mergeClasses, transform } from "../../core";
import { AiBadge } from "../badge";
import { AiEmpty } from "../empty";
import { AiCheckbox } from "../form-field";
import { AiIcon } from "../icon";
import { AiPaginationImports } from "../pagination/pagination.imports";
import { AiCellTemplateDirective } from "./cell-template.directive";
import { AiTableBorder, AiTableColumn, AiTableConfig, AiTablePagination, AiTableSize, AiTableSort } from "./table.config";
import { tableBodyCellVariants, tableBodyRowVariants, tableCheckboxCellVariants, tableHeadCellVariants, tableHeadRowVariants, tableWrapperVariants } from "./table.variants";

function alignClass(align?: "left" | "center" | "right"): string {
    if (align === "center") return "text-center";
    if (align === "right") return "text-right";
    return "text-left";
}

@Component({
    selector: "ai-table",
    exportAs: "aiTable",
    imports: [NgTemplateOutlet, AiBadge, AiCheckbox, AiEmpty, AiIcon, AiPaginationImports],
    templateUrl: "./table.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class AiTable<T = unknown> {
    readonly config = input.required<AiTableConfig<T>>();
    readonly size = input<AiTableSize>("default");
    readonly border = input<AiTableBorder>("simple");
    readonly class = input<ClassValue>("");
    readonly selectable = input<boolean, boolean | string>(false, { transform });
    readonly pagination = input<AiTablePagination>();

    readonly selectionChange = output<T[]>();
    readonly rowClick = output<T>();
    readonly pageChange = output<number>();
    readonly pageSizeChange = output<number>();
    readonly sortChange = output<AiTableSort>();

    protected readonly cellTemplates = contentChildren<AiCellTemplateDirective<T>>(AiCellTemplateDirective);
    readonly templateMap = new Map<string, TemplateRef<{ $implicit: T }>>();

    private readonly _sortField = signal<string | null>(null);
    private readonly _sortDirection = signal<"asc" | "desc">("asc");
    readonly sort = computed<AiTableSort | null>(() => {
        const field = this._sortField();
        return field ? { field, direction: this._sortDirection() } : null;
    });

    readonly Math = Math;

    private readonly _selection = signal<Set<T>>(new Set<T>());

    constructor() {
        effect(() => {
            this.templateMap.clear();
            for (const dir of this.cellTemplates()) {
                this.templateMap.set(dir.key, dir.template);
            }
        });
    }

    protected readonly wrapperClass = computed(() => mergeClasses(tableWrapperVariants({ border: this.border() })));
    protected readonly headRowClass = computed(() => mergeClasses(tableHeadRowVariants({ border: this.border() })));
    protected readonly bodyRowClass = computed(() => mergeClasses(tableBodyRowVariants({ border: this.border() })));
    protected readonly checkboxCellClass = computed(() => tableCheckboxCellVariants({ size: this.size(), border: this.border() }));

    headCellClass(align?: AiTableColumn<T>["align"]): string {
        return mergeClasses(tableHeadCellVariants({ size: this.size(), border: this.border() }), alignClass(align));
    }

    bodyCellClass(align?: AiTableColumn<T>["align"]): string {
        return mergeClasses(tableBodyCellVariants({ size: this.size(), border: this.border() }), alignClass(align));
    }

    getCellValue(row: T, column: AiTableColumn<T>): unknown {
        return column.cell ? column.cell(row) : (row as Record<string, unknown>)[column.key];
    }

    isSelected(row: T): boolean {
        return this._selection().has(row);
    }

    isAllSelected(): boolean {
        const data = this.config().data;
        return data.length > 0 && data.every(row => this._selection().has(row));
    }

    isIndeterminate(): boolean {
        const data = this.config().data;
        const count = data.filter(row => this._selection().has(row)).length;
        return count > 0 && count < data.length;
    }

    toggleRow(row: T): void {
        const next = new Set(this._selection());
        if (next.has(row)) {
            next.delete(row);
        } else {
            next.add(row);
        }
        this._selection.set(next);
        this.selectionChange.emit([...next]);
    }

    toggleAll(): void {
        const data = this.config().data;
        const next = this.isAllSelected() ? new Set<T>() : new Set<T>(data);
        this._selection.set(next);
        this.selectionChange.emit([...next]);
    }

    toggleSort(column: AiTableColumn<T>): void {
        if (!column.sortable) return;
        const currentField = this._sortField();
        if (currentField === column.key) {
            const next = this._sortDirection() === "asc" ? "desc" : "asc";
            this._sortDirection.set(next);
        } else {
            this._sortField.set(column.key);
            this._sortDirection.set("asc");
        }
        this.sortChange.emit({ field: column.key, direction: this._sortDirection() });
    }

    isSortActive(column: AiTableColumn<T>): boolean {
        return this._sortField() === column.key;
    }

    sortIcon(column: AiTableColumn<T>): "arrow-up-down" | "arrow-up" | "arrow-down" {
        if (!this.isSortActive(column)) return "arrow-up-down";
        return this._sortDirection() === "asc" ? "arrow-up" : "arrow-down";
    }
}
