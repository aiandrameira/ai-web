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
}

export interface AiTableSort {
    field: string;
    direction: "asc" | "desc";
}

export interface AiTablePagination {
    pageIndex?: number;
    pageSize?: number;
    totalItems?: number;
    pageSizeOptions?: number[];
    showInfo?: boolean;
    showPageSize?: boolean;
    showFirstLast?: boolean;
    siblingCount?: number;
    pageWindowSize?: number;
    size?: "default" | "lg" | "sm" | "xs";
    disabled?: boolean;
}
