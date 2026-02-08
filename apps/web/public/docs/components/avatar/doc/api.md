# API

## `[ai-avatar]` - Component

### Propriedades

| Propriedade | Descrição                              | Tipo                                                  | Default   |
| ----------- | -------------------------------------- | ----------------------------------------------------- | --------- |
| `alt`       | define o texto alternativo da imagem   | `string`                                              | `""`      |
| `fallback`  | define o texto de fallback             | `string`                                              | `""`      |
| `priority`  | define se a imagem é prioritária       | `boolean`                                             | `false`   |
| `size`      | define o tamanho                       | `xs \| sm \| md \| default \| lg \| xl`               | `default` |
| `shape`     | define o formato                       | `default \| circle`                                   | `default` |
| `image`     | define a url da image                  | `string \| SafeUrl`                                   | `""`      |
| `status`    | define o status do indicador do avatar | `"online" \| "invisible" \| "doNotDisturb" \| "away"` | `""`      |
| `class`     | classes CSS adicionais                 | `ClassValue`                                          | `""`      |

## `[ai-avatar-group]` - Component

### Propriedades

| Propriedade   | Descrição                    | Tipo                     | Default      |
| ------------- | ---------------------------- | ------------------------ | ------------ |
| `orientation` | define a orientação do grupo | `horizontal \| vertical` | `horizontal` |
| `class`       | classes CSS adicionais       | `ClassValue`             | `""`         |
