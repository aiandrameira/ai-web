# API

[AiTable] - Component

> O `[ai-table]` é um componente de tabela avançado que gerencia dados tabulares com suporte a paginação, seleção de linhas, sorting e configuração flexível de colunas.

### Propriedades

| Propriedade  | Descricao                                  | Tipo                                | Default   |
| ------------ | ------------------------------------------ | ----------------------------------- | --------- |
| `config`     | configuracao das colunas e dados da tabela | `AiTableConfig<T>` _(required)_     | `""`      |
| `size`       | define o tamanho das celulas               | `compact \| default \| comfortable` | `default` |
| `border`     | define o estilo de borda                   | `simple \| outline`                 | `simple`  |
| `selectable` | define se as linhas sao selecionaveis      | `boolean`                           | `false`   |
| `pagination` | configuracao de paginacao                  | `AiTablePagination`                 | `""`      |
| `class`      | classes CSS adicionais                     | `ClassValue`                        | `""`      |

### Eventos

| Evento            | Descricao                                      | Tipo          |
| ----------------- | ---------------------------------------------- | ------------- |
| `selectionChange` | emitido quando ha mudanca na selecao de linhas | `T[]`         |
| `rowClick`        | emitido quando uma linha da tabela e clicada   | `T`           |
| `pageChange`      | emitido quando a pagina e alterada             | `number`      |
| `pageSizeChange`  | emitido quando o tamanho da pagina e alterado  | `number`      |
| `sortChange`      | emitido quando uma coluna ordenavel e clicada  | `AiTableSort` |

---

[AiTableConfig<T>] - Interface

```ts
interface AiTableConfig<T> {
    columns: AiTableColumn<T>[];
    data: T[];
}
```

[AiTableColumn<T>] - Interface

```ts
interface AiTableColumn<T> {
    key: string;
    label: string;
    width?: string;
    sortable?: boolean;
    align?: "left" | "center" | "right";
    cell?: (row: T) => string;
}
```

[AiTableSort] - Interface

```ts
interface AiTableSort {
    field: string;
    direction: "asc" | "desc";
}
```

[AiTablePagination] - Interface

```ts
interface AiTablePagination {
    pageIndex?: number;
    pageSize?: number;
    totalItems?: number;
    pageSizeOptions?: number[];
    showInfo?: boolean;
    showPageSize?: boolean;
    siblingCount?: number;
    size?: "default" | "lg" | "sm" | "xs";
    disabled?: boolean;
}
```
