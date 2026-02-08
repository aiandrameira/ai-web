# API

## `[ai-checkbox]` - Component

### Propriedades

| Propriedade | Descrição                              | Tipo                                     | Default   |
| ----------- | -------------------------------------- | ---------------------------------------- | --------- |
| `id`        | define o identificador                 | `string`                                 | `""`      |
| `disabled`  | define se o checkbox está desabilitado | `boolean`                                | `false`   |
| `variant`   | define o estilo                        | `"primary" \| "accent" \| "destructive"` | `primary` |
| `size`      | define o tamanho                       | `"default" \| "large"`                   | `default` |
| `shape`     | define o formato                       | `"default" \| "circle"`                  | `default` |

### Eventos

| Evento        | Descrição                                    | Tipo                    |
| ------------- | -------------------------------------------- | ----------------------- |
| `changeCheck` | emite quando o estado do checkbox é alterado | `EventEmitter<boolean>` |
