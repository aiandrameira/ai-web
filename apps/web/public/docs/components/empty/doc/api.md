# API

[AiEmpty] - Component

> O `[ai-empty]` é um componente que exibe um estado vazio com ícone, título, descrição e ações personalizáveis para indicar quando não há conteúdo disponível.

### Propriedades

| Propriedade   | Descrição              | Tipo                                                  | Default       |
| ------------- | ---------------------- | ----------------------------------------------------- | ------------- |
| `icon`        | define o ícone         | `AiIconType` [**Remix Icon**](https://remixicon.com/) | `folder_code` |
| `title`       | define o título        | `string \| TemplateRef<void>`                         | `""`          |
| `image`       | define a URL da imagem | `string \| TemplateRef<void>`                         | `""`          |
| `description` | define a descrição     | `string \| TemplateRef<void>`                         | `""`          |
| `actions`     | define as ações        | `TemplateRef<void>[]`                                 | `[]`          |
| `class`       | classes CSS adicionais | `ClassValue`                                          | `""`          |

> _**Note:** Quando o seletor `image` é usado como string (URL), o tamanho da imagem é definido como 64 x 64 por padrão. Isso pode ser alterado pelo `TailwindCSS` usando o seletor `[&_img]`: para classes de dimensionamento, como no exemplo [custom-image](docs/components/empty#custom-image)._
