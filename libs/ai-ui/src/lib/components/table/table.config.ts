export type AiTableSize = "compact" | "default" | "comfortable";
export type AiTableBorder = "simple" | "outline";

export interface AiTableColumn<T> {
    key: string;
    label: string;
    width?: string;
    sortable?: boolean;
    align?: "left" | "center" | "right";
    cell?: (row: T) => string;
}

export interface AiTableConfig<T> {
    columns: AiTableColumn<T>[];
    data: T[];
    pageSize?: number;
    pageIndex?: number;
    totalItems?: number;
    onPageChange?: (pageIndex: number) => void;
    onSortChange?: (field: string, direction: "asc" | "desc") => void;
}
