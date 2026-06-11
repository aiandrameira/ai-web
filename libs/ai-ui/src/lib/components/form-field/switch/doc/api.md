# API

[AiSwitch] - Component

> O `ai-switch` é um componente de alternância (toggle) que permite ativar ou desativar uma opção, com suporte a diferentes variantes e tamanhos.

### Propriedades

| Propriedade | Descrição                            | Tipo                                     | Default   |
| ----------- | ------------------------------------ | ---------------------------------------- | --------- |
| `id`        | define o identificador               | `string`                                 | `""`      |
| `disabled`  | define se o switch está desabilitado | `boolean`                                | `false`   |
| `variant`   | define o estilo                      | `"primary" \| "accent" \| "destructive"` | `primary` |
| `size`      | define o tamanho                     | `"sm" \| "default" \| "lg"`              | `default` |
| `checked`   | define o estado do switch            | `boolean`                                | `false`   |
| `touched`   | define se o switch foi tocado        | `boolean`                                | `false`   |
| `class`     | classes CSS adicionais               | `ClassValue`                             | `""`      |

### Eventos

| Evento        | Descrição                                  | Tipo                     |
| ------------- | ------------------------------------------ | ------------------------ |
| `changeCheck` | emite quando o estado do switch é alterado | `OutputEmitter<boolean>` |
