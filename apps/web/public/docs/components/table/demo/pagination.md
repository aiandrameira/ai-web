```angular-ts showLineNumbers copyButton
import { Component, computed, signal } from "@angular/core";

import { AiTable } from "../table";
import { AiTableColumn, AiTableConfig, AiTablePagination } from "../table.config";
import { COLUMNS, iUser, USERS, userTypeEnum } from "./user";

@Component({
    selector: "ai-demo-table-pagination",
    imports: [AiTable],
    template: `
        <div class="flex flex-col gap-4 w-full">
            <ai-table [config]="config()" [pagination]="paginationConfig()" (pageChange)="onPageChange($event)" (changePageSize)="onPageSizeChange($event)" />
        </div>
    `,
})
export class DemoTablePaginationComponent {
    columns = signal<AiTableColumn<iUser>[]>(COLUMNS);
    data = [
        ...USERS,
        { id: "6", name: "Diana Prince", age: 32, type: userTypeEnum.SUPORT },
        { id: "7", name: "Edward Davis", age: 45, type: userTypeEnum.ADMIN },
        { id: "8", name: "Fiona Green", age: 22, type: userTypeEnum.MANAGER },
        { id: "9", name: "George Hall", age: 38, type: userTypeEnum.SUPORT },
        { id: "10", name: "Hannah Lee", age: 27, type: userTypeEnum.MANAGER },
        { id: "11", name: "Ivan Martin", age: 33, type: userTypeEnum.ADMIN },
        { id: "12", name: "Julia Clark", age: 29, type: userTypeEnum.SUPORT },
        { id: "13", name: "Kevin White", age: 42, type: userTypeEnum.MANAGER },
        { id: "14", name: "Laura Harris", age: 26, type: userTypeEnum.ADMIN },
        { id: "15", name: "Michael Scott", age: 48, type: userTypeEnum.ADMIN },
        { id: "16", name: "Nancy Lewis", age: 31, type: userTypeEnum.MANAGER },
        { id: "17", name: "Oscar Young", age: 36, type: userTypeEnum.SUPORT },
        { id: "18", name: "Patricia King", age: 24, type: userTypeEnum.MANAGER },
        { id: "19", name: "Quinn Adams", age: 39, type: userTypeEnum.ADMIN },
        { id: "20", name: "Rachel Moore", age: 23, type: userTypeEnum.SUPORT },
    ];

    readonly pageIndex = signal(1);
    readonly pageSize = signal(5);

    readonly pagedData = computed(() => {
        const start = (this.pageIndex() - 1) * this.pageSize();
        return this.data.slice(start, start + this.pageSize());
    });

    readonly config = computed<AiTableConfig<iUser>>(() => ({
        columns: this.columns(),
        data: this.pagedData(),
    }));

    readonly paginationConfig = computed<AiTablePagination>(() => ({
        pageIndex: this.pageIndex(),
        pageSize: this.pageSize(),
        totalItems: this.data.length,
        showInfo: true,
        showPageSize: true,
        showFirstLast: true,
        pageSizeOptions: [5, 10, 20],
    }));

    onPageChange(page: number): void {
        this.pageIndex.set(page);
    }

    onPageSizeChange(size: number): void {
        this.pageSize.set(size);
        this.pageIndex.set(1);
    }
}
```
