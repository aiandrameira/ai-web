import { Component, computed, signal } from "@angular/core";

import { AiTable } from "../table";
import { AiTableColumn, AiTableConfig } from "../table.config";
import { COLUMNS, iUser, USERS } from "./user";

@Component({
    selector: "ai-demo-table-selected",
    imports: [AiTable],
    template: `
        <div class="flex flex-col gap-8 w-full max-w-2xl">
            <ai-table [config]="config()" selectable (selectionChange)="selected = $event" />
            <p class="text-xs text-muted-foreground">Selecionados: {{ selected.length }}</p>
        </div>
    `,
})
export class DemoTableSelectedComponent {
    columns = signal<AiTableColumn<iUser>[]>(COLUMNS);
    data = USERS;
    selected: iUser[] = [];

    config = computed<AiTableConfig<iUser>>(() => ({ columns: this.columns(), data: this.data }));
}
