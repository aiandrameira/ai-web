# API

## `[ai-table]` - Component

### Propriedades

| Propriedade  | Descrição                                  | Tipo                                | Default   |
| ------------ | ------------------------------------------ | ----------------------------------- | --------- |
| `config`     | configuração das colunas e dados da tabela | `AiTableConfig<T>` _(required)_     | `""`      |
| `size`       | define o tamanho das células               | `compact \| default \| comfortable` | `default` |
| `border`     | define o estilo de borda                   | `simple \| outline`                 | `simple`  |
| `selectable` | define se as linhas são selecionáveis      | `boolean`                           | `false`   |
| `class`      | classes CSS adicionais                     | `ClassValue`                        | `""`      |

### Outputs

| Output            | Descrição                                      | Tipo  |
| ----------------- | ---------------------------------------------- | ----- |
| `selectionChange` | emitido quando há mudança na seleção de linhas | `T[]` |

### Interfaces

#### `AiTableConfig<T>`

```typescript
interface AiTableConfig<T> {
    columns: AiTableColumn<T>[];
    data: T[];
    pageSize?: number;
    pageIndex?: number;
    totalItems?: number;
    onPageChange?: (pageIndex: number) => void;
    onSortChange?: (field: string, direction: "asc" | "desc") => void;
}
```

#### `AiTableColumn<T>`

```typescript
interface AiTableColumn<T> {
    key: string;
    label: string;
    width?: string;
    sortable?: boolean;
    align?: "left" | "center" | "right";
    cell?: (row: T) => string;
}
```
