# API

## `[ai-card]` - Component

### Propriedades

| Propriedade   | Descrição                                | Tipo                                                  | Default     |
| ------------- | ---------------------------------------- | ----------------------------------------------------- | ----------- |
| `variant`     | define o estilo visual do card           | `default \| primary`                                  | `default`   |
| `title`       | título exibido no header do card         | `string \| TemplateRef<void>`                         | `undefined` |
| `description` | descrição exibida abaixo do título       | `string \| TemplateRef<void>`                         | `undefined` |
| `icon`        | ícone exibido ao lado do título          | `AiIconType` [**Remix Icon**](https://remixicon.com/) | `""`        |
| `routerLink`  | link de navegação (para cards clicáveis) | `string \| null`                                      | `""`        |
| `class`       | classes CSS adicionais                   | `ClassValue`                                          | `""`        |
