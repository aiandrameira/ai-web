# API

## [ai-float-button] - Component/Directive

> `[ai-float-button]` é um componente/diretiva de botão flutuante personalizável, usado para ações rápidas na tela.

### Propriedades

| Propriedade | Descrição                     | Tipo                                                           | Default   |
| ----------- | ----------------------------- | -------------------------------------------------------------- | --------- |
| `variant`   | define o estilo               | `primary \| accent \| default`                                 | `default` |
| `icon`      | define o ícone                | `AiIconType` [**Remix Icon**](https://remixicon.com/)          | `""`      |
| `size`      | define o tamanho              | `normal \| lg`                                                 | `default` |
| `shape`     | define o formato              | `default \| circle`                                            | `default` |
| `label`     | define o rótulo a ser exibido | `string`                                                       | `""`      |
| `position`  | define a posição              | `top-left \| top-right \| bottom-left \| bottom-right \| null` | `null`    |
| `class`     | Classes **CSS** adicionais    | `string`                                                       | `""`      |

## [ai-float-button-top] - Component

> `[ai-float-button-top]` é uma variação fixa do botão flutuante, geralmente usado para atalhos de navegação.

| Propriedade | Descrição                     | Tipo                                                   | Default        |
| ----------- | ----------------------------- | ------------------------------------------------------ | -------------- |
| `variant`   | define o estilo               | `primary \| accent \| default`                         | `default`      |
| `icon`      | define o ícone                | `AiIconType` [**Remix Icon**](https://remixicon.com/)  | `""`           |
| `size`      | define o tamanho              | `default \| lg`                                        | `default`      |
| `shape`     | define o formato              | `default \| circle`                                    | `default`      |
| `label`     | define o rótulo a ser exibido | `string`                                               | `""`           |
| `position`  | define a posição              | `top-left \| top-right \| bottom-left \| bottom-right` | `bottom-right` |
| `class`     | Classes **CSS** adicionais    | `string`                                               | `""`           |

## [ai-float-button-group] - Component

> `[ai-float-button-group]` organiza múltiplos botões flutuantes em grupo, com opções de expansão.

| Propriedade        | Descrição                          | Tipo                                                                              | Default   |
| ------------------ | ---------------------------------- | --------------------------------------------------------------------------------- | --------- |
| `variant`          | define o estilo                    | `primary \| accent \| default`                                                    | `default` |
| `icon`             | define o ícone                     | `AiIconType` [**Remix Icon**](https://remixicon.com/)                             | `""`      |
| `size`             | define o tamanho                   | `default \| lg`                                                                   | `default` |
| `shape`            | define o formato                   | `default \| circle`                                                               | `default` |
| `label`            | define o rótulo a ser exibido      | `string`                                                                          | `""`      |
| `position`         | define a posição                   | `top-right \| top-center \| bottom-left \| bottom-right \| bottom-center \| null` | `null`    |
| `childrenPosition` | define a posição dos botões filhos | `top \| left`                                                                     | `top`     |
| `trigger`          | define a ação para abrir o menu    | `click \| hover`                                                                  | `click`   |
| `class`            | define classes **CSS** adicionais  | `string`                                                                          | `""`      |

### Eventos

| Evento       | Descrição                 | Tipo                 |
| ------------ | ------------------------- | -------------------- |
| `changeOpen` | Disparado ao abrir o menu | `EventEmitter<void>` |
