import { Component, computed, signal } from "@angular/core";

import { AiBadge } from "../../badge";
import { AiCellTemplateDirective } from "../cell-template.directive";
import { AiTable } from "../table";
import { AiTableColumn, AiTableConfig } from "../table.config";
import { COLUMNS, iUser, USERS } from "./user";

@Component({
    selector: "ai-demo-table-default",
    imports: [AiTable, AiBadge, AiCellTemplateDirective],
    template: `
        <div class="flex flex-col gap-8 w-full max-w-2xl">
            <ai-table [config]="config()" (rowClick)="onRowClick($event)">
                <ng-template aiCellTemplate="age" let-item>
                    <ai-badge shape="circle">{{ item.age }} anos</ai-badge>
                </ng-template>
            </ai-table>
            @if (clicked()) {
                <p class="text-xs text-muted-foreground">Clicou em: {{ clicked()?.name }}</p>
            }
        </div>
    `,
})
export class DemoTableDefaultComponent {
    columns = signal<AiTableColumn<iUser>[]>(COLUMNS);
    data = USERS;
    clicked = signal<iUser | null>(null);

    config = computed<AiTableConfig<iUser>>(() => ({ columns: this.columns(), data: this.data }));

    onRowClick(row: iUser) {
        this.clicked.set(row);
    }
}
