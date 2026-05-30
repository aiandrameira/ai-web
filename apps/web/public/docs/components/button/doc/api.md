# API

[AiButton] - Component

> O `[ai-button]` é um componente de botão versátil que oferece múltiplas variações de estilo, tamanho e comportamento para diferentes contextos da interface.

### Propriedades

| Property   | Description                                      | Type                                                                           | Default   |
| ---------- | ------------------------------------------------ | ------------------------------------------------------------------------------ | --------- |
| `variant`  | define a cor                                     | `primary \| destructive \| ghost` <br/> `outline \| accent \| link \| default` | `primary` |
| `icon`     | define o ícone                                   | `AiIconType` [**Remix Icon**](https://remixicon.com/)                          | `""`      |
| `size`     | define o tamanho                                 | `default \| lg \| sm \| sm`                                                    | `default` |
| `shape`    | define o formato                                 | `default \| circle`                                                            | `default` |
| `type`     | define o tipo                                    | `button \| submit \| reset`                                                    | `button`  |
| `fill`     | define o tipo de preenchimento                   | `default \| line`                                                              | `default` |
| `full`     | define se o botão ocupa 100% da largura          | `boolean`                                                                      | `false`   |
| `loading`  | define se o botão está em estado de carregamento | `boolean`                                                                      | `false`   |
| `disabled` | define se o botão está desabilitado              | `boolean`                                                                      | `false`   |
| `class`    | classes CSS adicionais                           | `ClassValue`                                                                   | `""`      |
