# API

[AiProgressBar] - Component

> O `<ai-progress-bar>` exibe o progresso de uma operação nos formatos linear ou circular.

### Propriedades

| Propriedade     | Descrição                        | Tipo                        | Default     |
| --------------- | -------------------------------- | --------------------------- | ----------- |
| `variant`       | cor da barra de progresso        | `"primary" \| "accent"`     | `"primary"` |
| `size`          | tamanho do componente            | `"sm" \| "default" \| "lg"` | `"default"` |
| `shape`         | formato da barra                 | `"default" \| "circle"`     | `"default"` |
| `indeterminate` | modo indeterminado               | `boolean`                   | `false`     |
| `showLabel`     | exibe o percentual               | `boolean`                   | `false`     |
| `progress`      | valor do progresso (0 a 100)     | `number`                    | `0`         |
| `class`         | classes CSS adicionais           | `ClassValue`                | `""`        |
| `barClass`      | classes CSS para a barra interna | `ClassValue`                | `""`        |

### Acessibilidade

O componente inclui `role="progressbar"` com `aria-valuenow`, `aria-valuemin` e `aria-valuemax` automaticamente.
