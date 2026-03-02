import { Component, computed, signal } from "@angular/core";

import { AiTable } from "../table";
import { AiTableColumn, AiTableConfig } from "../table.config";
import { COLUMNS, iUser, USERS } from "./user";

@Component({
    selector: "ai-demo-table-border",
    imports: [AiTable],
    template: `
        <div class="flex flex-col gap-8 w-full max-w-2xl">
            <ai-table [config]="config()" [border]="'outline'" />
            <ai-table [config]="config()" [border]="'simple'" />
        </div>
    `,
})
export class DemoTableBorderComponent {
    columns = signal<AiTableColumn<iUser>[]>(COLUMNS);
    data = USERS;

    config = computed<AiTableConfig<iUser>>(() => ({ columns: this.columns(), data: this.data }));
}
