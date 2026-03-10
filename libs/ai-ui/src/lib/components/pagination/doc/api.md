# API

[AiPagination] - Component

> O `[ai-pagination]` é um componente de paginação que gerencia navegação entre páginas com suporte a seleção de tamanho de página e informações detalhadas.

### Propriedades

| Propriedade       | Descrição                                     | Tipo                             | Default             |
| ----------------- | --------------------------------------------- | -------------------------------- | ------------------- |
| `pageIndex`       | página atual (model)                          | `number`                         | `1`                 |
| `total`           | número total de páginas                       | `number`                         | `1`                 |
| `totalItems`      | total de itens (para exibição de info)        | `number`                         | `0`                 |
| `pageSize`        | itens por página (model)                      | `number`                         | `10`                |
| `pageSizeOptions` | opções disponíveis para itens por página      | `number[]`                       | `[10, 20, 50, 100]` |
| `siblingCount`    | número de páginas antes/depois da atual       | `number`                         | `1`                 |
| `showInfo`        | exibe informações de total de itens e páginas | `boolean`                        | `false`             |
| `showPageSize`    | exibe select para alterar itens por página    | `boolean`                        | `false`             |
| `size`            | tamanho dos botões de paginação               | `default \| lg \| sm \| xs`      | `default`           |
| `disabled`        | desabilita a paginação                        | `boolean`                        | `false`             |
| `content`         | template customizado para conteúdo            | `TemplateRef<void> \| undefined` | `undefined`         |
| `ariaLabel`       | label ARIA para acessibilidade                | `string`                         | `Pagination`        |
| `class`           | classes CSS adicionais                        | `ClassValue`                     | `""`                |

### Outputs

| Output            | Descrição                                     | Tipo     |
| ----------------- | --------------------------------------------- | -------- |
| `pageIndexChange` | emitido quando a página é alterada            | `number` |
| `pageSizeChange`  | emitido quando o tamanho da página é alterado | `number` |
