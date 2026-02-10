# API

## `[ai-button-toggle]` - Component

### Propriedades

| Propriedade    | Descrição                                      | Tipo                        | Default      |
| -------------- | ---------------------------------------------- | --------------------------- | ------------ |
| `items`        | define um array de itens                       | `AiButtonToggleItem[]`      | `[]`         |
| `mode`         | define o modo de seleção (único ou múltiplo)   | `"single" \| "multiple"`    | `"multiple"` |
| `variant`      | define o estilo                                | `"primary" \| "outline"`    | `"outline"`  |
| `size`         | define o tamanho dos botões                    | `"sm" \| "default" \| "lg"` | `"default"`  |
| `value`        | define o valor atual (controlado)              | `string \| string[]`        | `""`         |
| `defaultValue` | define o valor inicial padrão (não controlado) | `string \| string[]`        | `""`         |
| `disabled`     | desabilita todo o grupo                        | `boolean`                   | `false`      |
| `class`        | classes CSS adicionais                         | `ClassValue`                | `""`         |

### Eventos

| Evento        | Descrição                                     | Tipo                               |
| ------------- | --------------------------------------------- | ---------------------------------- |
| `changeValue` | emitido quando o valor selecionado é alterado | `EventEmitter<string \| string[]>` |
