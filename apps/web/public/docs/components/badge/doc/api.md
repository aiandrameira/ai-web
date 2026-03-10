# API

[AiBadge] - Component

> O `[ai-badge]` é um componente de badge que exibe uma pequena quantidade de informação, como um número ou um status, para destacar ou identificar algo.

### Propriedades

| Propriedade | Descrição                                 | Tipo                                                                                   | Default   |
| ----------- | ----------------------------------------- | -------------------------------------------------------------------------------------- | --------- |
| `variant`   | define a cor                              | `default \| primary \| accent \| outline \| destructive \| info \| warning \| success` | `primary` |
| `icon`      | define o ícone                            | `AiIconType` [**Remix Icon**](https://remixicon.com/)                                  | `""`      |
| `shape`     | define o formato                          | `normal \| circle`                                                                     | `normal`  |
| `disabled`  | define se o badge está desabilitado       | `boolean, string \| boolean`                                                           | `false`   |
| `fill`      | define o tipo de preenchimento            | `default \| line`                                                                      | `default` |
| `close`     | define se o badge exibe o ícone de fechar | `boolean, string \| boolean`                                                           | `false`   |
| `class`     | classes CSS adicionais                    | `ClassValue`                                                                           | `""`      |

### Eventos

| Evento   | Descrição                                        | Tipo               |
| -------- | ------------------------------------------------ | ------------------ |
| `closed` | emitido quando a ação para fechar o badge ocorre | `MouseEvent<void>` |
