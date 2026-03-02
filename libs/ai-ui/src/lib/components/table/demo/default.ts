import { Component, computed, signal } from "@angular/core";

import { AiBadge } from "../../badge";
import { AiCellTemplateDirective } from "../cell-template.directive";
import { AiTable } from "../table";
import { AiTableColumn, AiTableConfig } from "../table.config";
import { COLUMNS, iUser, USERS } from "./user";

@Component({
    selector: "ai-demo-table",
    imports: [AiTable, AiBadge, AiCellTemplateDirective],
    template: `
        <div class="flex flex-col gap-8 w-full max-w-2xl">
            <ai-table [config]="config()">
                <ng-template aiCellTemplate="age" let-item>
                    <ai-badge shape="circle">{{ item.age }} anos</ai-badge>
                </ng-template>
            </ai-table>
        </div>
    `,
})
export class DemoTableDefaultComponent {
    columns = signal<AiTableColumn<iUser>[]>(COLUMNS);
    data = USERS;

    config = computed<AiTableConfig<iUser>>(() => ({ columns: this.columns(), data: this.data }));
}
