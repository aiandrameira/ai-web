# API

[AiAvatar] - Component

> O `[ai-avatar]` é um componente de avatar que exibe uma imagem, texto ou ícone para representar um usuário ou entidade.

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

---

[AiAvatarGroup] - Component

> O `[ai-avatar-group]` é um componente de grupo de avatares que organiza múltiplos avatares em uma única linha, com suporte a limite de exibição e contagem de avatares adicionais.

### Propriedades

| Propriedade   | Descrição                    | Tipo                     | Default      |
| ------------- | ---------------------------- | ------------------------ | ------------ |
| `orientation` | define a orientação do grupo | `horizontal \| vertical` | `horizontal` |
| `class`       | classes CSS adicionais       | `ClassValue`             | `""`         |
