```angular-ts showLineNumbers copyButton
import { AiTableColumn } from "../table.config";

export enum userTypeEnum {
    ADMIN = 1,
    MANAGER = 2,
    SUPORT = 3,
}

export const userTypeMap = new Map<userTypeEnum, string>([
    [userTypeEnum.ADMIN, "Admin"],
    [userTypeEnum.MANAGER, "Manager"],
    [userTypeEnum.SUPORT, "Suport"],
]);

export interface iUser {
    id: string;
    name: string;
    age: number;
    type: userTypeEnum;
}

export const USERS: iUser[] = [
    { id: "1", name: "John Doe", age: 30, type: userTypeEnum.ADMIN },
    { id: "2", name: "Jane Smith", age: 25, type: userTypeEnum.MANAGER },
    { id: "3", name: "Bob Johnson", age: 40, type: userTypeEnum.SUPORT },
    { id: "4", name: "Alice Brown", age: 28, type: userTypeEnum.MANAGER },
    { id: "5", name: "Charlie Wilson", age: 35, type: userTypeEnum.ADMIN },
];

export const COLUMNS: AiTableColumn<iUser>[] = [
    { key: "id", label: "ID", width: "80px" },
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "type", label: "Type", cell: (row: iUser) => userTypeMap.get(row.type) || "" },
];
```
