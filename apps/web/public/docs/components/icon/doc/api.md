# API

[AiIcon] - Component

> O `[ai-icon]` é um componente de ícone versátil que integra a biblioteca Remix Icon com suporte a variações de cor, tamanho e tipos de preenchimento.

### Propriedades

| Propriedade | Descrição                           | Tipo                                                                        | Default   |
| ----------- | ----------------------------------- | --------------------------------------------------------------------------- | --------- |
| `icon`      | define o nome do ícone              | `AiIconType` [**Remix Icon**](https://remixicon.com/)                       | `""`      |
| `variant`   | define a cor                        | `primary \| accent \| destructive \| warning \| info \| success \| default` | `primary` |
| `size`      | define o tamanho                    | `sm \| default \| lg \| xl`                                                 | `default` |
| `type`      | define o tipo de preenchimento      | `line \| fill`                                                              | `line`    |
| `disabled`  | define se o ícone está desabilitado | `boolean`                                                                   | `false`   |
| `class`     | classes CSS adicionais              | `ClassValue`                                                                | `""`      |
