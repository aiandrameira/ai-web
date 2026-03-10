```angular-ts showLineNumbers copyButton
import { Component, computed, signal } from "@angular/core";

import { AiSeparator } from "../../separator";
import { AiTable } from "../table";
import { AiTableColumn, AiTableConfig } from "../table.config";
import { COLUMNS, iUser, USERS } from "./user";

@Component({
    selector: "ai-demo-table-size",
    imports: [AiTable, AiSeparator],
    template: `
        <div class="flex flex-col gap-4 w-full max-w-2xl">
            <div class="flex flex-col gap-y-2">
                <h2 class="text-primary text-sm font-bold">Table Compact</h2>
                <ai-table [config]="config()" size="compact" />
                <ai-separator />
            </div>
            <div class="flex flex-col gap-y-2">
                <h2 class="text-primary text-sm font-bold">Table Default</h2>
                <ai-table [config]="config()" size="default" />
                <ai-separator />
            </div>
            <div class="flex flex-col gap-y-2">
                <h2 class="text-primary text-sm font-bold">Table Comfortable</h2>
                <ai-table [config]="config()" size="comfortable" />
            </div>
        </div>
    `,
})
export class DemoTableSizeComponent {
    columns = signal<AiTableColumn<iUser>[]>(COLUMNS);
    data = USERS;

    config = computed<AiTableConfig<iUser>>(() => ({ columns: this.columns(), data: this.data }));
}
```
