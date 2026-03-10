import { Component, computed, signal } from "@angular/core";

import { AiTable } from "../table";
import { AiTableColumn, AiTableConfig, AiTableSort } from "../table.config";
import { iUser, USERS } from "./user";

const SORTABLE_COLUMNS: AiTableColumn<iUser>[] = [
    { key: "id", label: "ID", width: "80px" },
    { key: "name", label: "Name", sortable: true },
    { key: "age", label: "Age", sortable: true },
];

@Component({
    selector: "ai-demo-table-sort",
    imports: [AiTable],
    template: `
        <div class="flex flex-col gap-4 w-full max-w-2xl">
            <ai-table [config]="config()" (sortChange)="onSortChange($event)" />
            @if (sort()) {
                <p class="text-xs text-muted-foreground">
                    Ordenando por: <strong>{{ sort()?.field }}</strong> ({{ sort()?.direction }})
                </p>
            }
        </div>
    `,
})
export class DemoTableSortComponent {
    readonly sort = signal<AiTableSort | null>(null);

    readonly sortedData = computed(() => {
        const s = this.sort();
        if (!s) return USERS;
        return [...USERS].sort((a, b) => {
            const valA = a[s.field as keyof iUser];
            const valB = b[s.field as keyof iUser];
            const cmp = valA < valB ? -1 : valA > valB ? 1 : 0;
            return s.direction === "asc" ? cmp : -cmp;
        });
    });

    readonly config = computed<AiTableConfig<iUser>>(() => ({
        columns: SORTABLE_COLUMNS,
        data: this.sortedData(),
    }));

    onSortChange(sort: AiTableSort): void {
        this.sort.set(sort);
    }
}
