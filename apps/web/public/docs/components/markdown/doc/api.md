# API

[AiMarkdown] - Component

> O `[ai-markdown]` é um componente versátil que oferece um editor markdown e visualizador com suporte a múltiplas linguagens de programação, temas e modo de visualização.

### Propriedades

| Propriedade | Descrição                         | Tipo                                                                                          | Default        |
| ----------- | --------------------------------- | --------------------------------------------------------------------------------------------- | -------------- |
| `mode`      | define o modo de operação         | `"editor" \| "viewer"`                                                                        | `"editor"`     |
| `code`      | define o código inicial           | `string`                                                                                      | `""`           |
| `language`  | define a linguagem de programação | `"typescript" \| "javascript" \| "html" \| "css" \| "json" \| "bash" \| "markdown" \| "java"` | `"typescript"` |
| `theme`     | define o tema do editor           | `"light" \| "dark"`                                                                           | `"light"`      |
| `class`     | classes CSS adicionais            | `ClassValue`                                                                                  | `""`           |

### Eventos

| Evento       | Descrição                                    | Tipo     |
| ------------ | -------------------------------------------- | -------- |
| `changeCode` | emitido quando o código no editor é alterado | `string` |

### Métodos

| Método                  | Descrição                                   | Retorno         |
| ----------------------- | ------------------------------------------- | --------------- |
| `setLanguage(language)` | altera a linguagem de programação do editor | `void`          |
| `setTheme()`            | alterna entre tema claro e escuro           | `void`          |
| `setTab(tab)`           | altera a aba ativa (code ou preview)        | `void`          |
| `clearCode()`           | limpa todo o código no editor               | `void`          |
| `copyCode()`            | copia o código para a área de transferência | `Promise<void>` |
