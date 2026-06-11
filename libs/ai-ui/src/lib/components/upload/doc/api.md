# API

[AiUpload] - Component

> O `[ai-upload]` permite selecionar arquivos via botão ou área de arrastar e soltar.

### Propriedades

| Propriedade | Descrição                             | Tipo                         | Default    |
| ----------- | ------------------------------------- | ---------------------------- | ---------- |
| `id`        | identificador do input                | `string`                     | `""`       |
| `type`      | modo do upload                        | `"button" \| "dropzone"`     | `"button"` |
| `accept`    | tipos de arquivo aceitos              | `string`                     | `""`       |
| `multiple`  | permite selecionar múltiplos arquivos | `boolean, string \| boolean` | `false`    |
| `disabled`  | desabilita o upload                   | `boolean, string \| boolean` | `false`    |
| `class`     | classes CSS adicionais                | `ClassValue`                 | `""`       |

### Eventos

| Evento        | Descrição                                          | Tipo                       |
| ------------- | -------------------------------------------------- | -------------------------- |
| `changeFile`  | emitido quando um arquivo é selecionado            | `OutputEmitterRef<File>`   |
| `changeFiles` | emitido quando múltiplos arquivos são selecionados | `OutputEmitterRef<File[]>` |

---

[AiUploadSelected] - Component

> O `[ai-upload-selected]` exibe o(s) arquivo(s) selecionado(s) com opção de remoção.

### Propriedades

| Propriedade | Descrição                    | Tipo                   | Default  |
| ----------- | ---------------------------- | ---------------------- | -------- |
| `config`    | dados do arquivo selecionado | `AiFileUpload \| null` | `null`   |
| `type`      | modo de exibição             | `"list" \| "card"`     | `"list"` |
| `class`     | classes CSS adicionais       | `ClassValue`           | `""`     |

### Eventos

| Evento   | Descrição                              | Tipo                             |
| -------- | -------------------------------------- | -------------------------------- |
| `remove` | emitido quando o usuário remove o item | `OutputEmitterRef<AiFileUpload>` |

---

[AiFileUpload] - Interface

| Propriedade | Descrição                    | Tipo               | Obrigatório |
| ----------- | ---------------------------- | ------------------ | ----------- |
| `file`      | objeto File nativo           | `File`             | Não         |
| `name`      | nome do arquivo              | `string`           | Sim         |
| `base64`    | conteúdo base64 para preview | `string`           | Sim         |
| `value`     | valor customizado            | `T \| null`        | Não         |
| `size`      | tamanho do arquivo           | `string \| number` | Não         |
| `disabled`  | controla estado desabilitado | `boolean`          | Não         |

---

[AiFileUploadService] - Service

| Método         | Descrição                | Retorno                         |
| -------------- | ------------------------ | ------------------------------- |
| `readAsBase64` | lê o arquivo como base64 | `Promise<AiFileUpload<string>>` |
