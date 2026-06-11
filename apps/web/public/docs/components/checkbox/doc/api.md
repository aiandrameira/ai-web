# API

[AiCheckbox] - Component

> O `[ai-checkbox]` é um componente de caixa de seleção que permite ao usuário selecionar ou desmarcar uma opção, com suporte a diferentes estilos, tamanhos e formatos.

### Propriedades

| Propriedade     | Descrição                                         | Tipo                         | Default   |
| --------------- | ------------------------------------------------- | ---------------------------- | --------- |
| `id`            | define o identificador                            | `string`                     | `""`      |
| `disabled`      | define se o checkbox está desabilitado            | `boolean`                    | `false`   |
| `variant`       | define o estilo                                   | `"primary" \| "destructive"` | `primary` |
| `size`          | define o tamanho                                  | `"default" \| "lg"`          | `default` |
| `shape`         | define o formato                                  | `"default" \| "circle"`      | `default` |
| `checked`       | define o estado do checkbox                       | `boolean`                    | `false`   |
| `touched`       | define se o checkbox foi tocado                   | `boolean`                    | `false`   |
| `indeterminate` | define se o checkbox está em estado indeterminado | `boolean`                    | `false`   |
| `class`         | classes CSS adicionais                            | `ClassValue`                 | `""`      |

### Eventos

| Evento        | Descrição                                    | Tipo                    |
| ------------- | -------------------------------------------- | ----------------------- |
| `changeCheck` | emite quando o estado do checkbox é alterado | `EventEmitter<boolean>` |
