# API

[AiCommand] - Component

> O `[ai-command]` é um componente flexível e acessível que encapsula todos os outros componentes do command, gerenciando o estado da busca, filtro e navegação de itens.

### Propriedades

| Propriedade | Descrição              | Tipo                  | Default   |
| ----------- | ---------------------- | --------------------- | --------- |
| `size`      | define o tamanho       | `default \| sm \| lg` | `default` |
| `class`     | classes CSS adicionais | `ClassValue`          | `""`      |

### Eventos

| Evento            | Descrição                               | Tipo                  |
| ----------------- | --------------------------------------- | --------------------- |
| `changeCommand`   | emitido quando um comando muda          | `AiCommandItemConfig` |
| `selectedCommand` | emitido quando um comando é selecionado | `AiCommandItemConfig` |

---

[AiCommandInput] - Component

> `[ai-command-input]` é um componente que fornece o campo de entrada para busca de comandos e implementa ControlValueAccessor para integração com formulários.

### Propriedades

| Propriedade   | Descrição              | Tipo         | Default               |
| ------------- | ---------------------- | ------------ | --------------------- |
| `placeholder` | texto de placeholder   | `string`     | `"Type a command..."` |
| `class`       | classes CSS adicionais | `ClassValue` | `""`                  |

### Eventos

| Evento        | Descrição                   | Tipo     |
| ------------- | --------------------------- | -------- |
| `changeValue` | emitido quando o valor muda | `string` |

---

[AiCommandList] - Component

> `[ai-command-list]` renderiza o contêiner para itens e grupos de comandos. Normalmente usado dentro de `[ai-command]` para controlar o layout da lista.

### Propriedades

| Propriedade | Descrição              | Tipo         | Default |
| ----------- | ---------------------- | ------------ | ------- |
| `class`     | classes CSS adicionais | `ClassValue` | `""`    |

---

[AiCommandItem] - Component

> `[ai-command-item]` representa um único comando na paleta e pode conter ícones, labels, atalhos e estados desabilitados.

### Propriedades

| Propriedade | Descrição                         | Tipo                                                  | Default   |
| ----------- | --------------------------------- | ----------------------------------------------------- | --------- |
| `value`     | valor único do item (obrigatório) | `unknown`                                             | —         |
| `label`     | rótulo exibido (obrigatório)      | `string`                                              | —         |
| `command`   | nome do comando para filtro       | `string`                                              | `""`      |
| `icon`      | ícone do Remix Icon               | `AiIconType` [**Remix Icon**](https://remixicon.com/) | —         |
| `shortcut`  | exibição de atalho de teclado     | `string`                                              | `""`      |
| `disabled`  | desabilita o item                 | `boolean`                                             | `false`   |
| `variant`   | define o estilo                   | `default`                                             | `default` |
| `class`     | classes CSS adicionais            | `ClassValue`                                          | `""`      |

---

[AiCommandItemGroup] - Component

> `[ai-command-item-group]` agrupa itens de comando com um rótulo e gerencia a visibilidade dos itens baseado na busca.

### Propriedades

| Propriedade | Descrição                     | Tipo         | Default |
| ----------- | ----------------------------- | ------------ | ------- |
| `label`     | rótulo do grupo (obrigatório) | `string`     | —       |
| `class`     | classes CSS adicionais        | `ClassValue` | `""`    |

---

[AiCommandSeparator] - Component

> O `[ai-command-separator]` exibe um separador visual entre grupos de comandos.

### Propriedades

| Propriedade | Descrição              | Tipo         | Default |
| ----------- | ---------------------- | ------------ | ------- |
| `class`     | classes CSS adicionais | `ClassValue` | `""`    |

---

[AiCommandEmpty] - Component

> `[ai-command-empty]` exibe uma mensagem quando nenhum comando é encontrado na busca.

### Propriedades

| Propriedade | Descrição              | Tipo         | Default |
| ----------- | ---------------------- | ------------ | ------- |
| `class`     | classes CSS adicionais | `ClassValue` | `""`    |

---

[AiCommandItemConfig] - Interface

> A interface `AiCommandItemConfig` define a estrutura de configuração para um item de comando, incluindo propriedades como valor, rótulo, ícone, atalho e ação associada.

### Propriedades

| Propriedade | Descrição                         | Tipo                                                  | Default |
| ----------- | --------------------------------- | ----------------------------------------------------- | ------- |
| `value`     | valor único do item (obrigatório) | `string \| unknown`                                   | —       |
| `label`     | rótulo exibido (obrigatório)      | `string`                                              | —       |
| `disabled`  | desabilita o item                 | `boolean`                                             | `false` |
| `command`   | nome do comando para filtro       | `string`                                              | `""`    |
| `shortcut`  | exibição de atalho de teclado     | `string`                                              | `""`    |
| `icon`      | ícone do Remix Icon               | `AiIconType` [**Remix Icon**](https://remixicon.com/) | —       |
| `action`    | função a ser executada no clique  | `() => void`                                          | —       |
| `key`       | chave única para identificação    | `string`                                              | `""`    |

---

[AiCommandGroup] - Interface

> A interface `AiCommandGroup` define a estrutura de configuração para um grupo de comandos, incluindo um rótulo e uma lista de itens de comando associados.

### Propriedades

| Propriedade | Descrição                     | Tipo                    | Default |
| ----------- | ----------------------------- | ----------------------- | ------- |
| `label`     | rótulo do grupo (obrigatório) | `string`                | —       |
| `items`     | lista de itens de comando     | `AiCommandItemConfig[]` | —       |

---

[AiCommandConfig] - Interface

> A interface `AiCommandConfig` define as opções de configuração para o componente de `command`.

### Propriedades

| Propriedade   | Descrição                                        | Tipo                                  | Default |
| ------------- | ------------------------------------------------ | ------------------------------------- | ------- |
| `placeholder` | texto exibido quando nenhum valor é inserido     | `string`                              | `""`    |
| `emptyText`   | texto exibido quando nenhum comando é encontrado | `string`                              | `""`    |
| `groups`      | lista de grupos de comandos                      | `AiCommandGroup[]`                    | —       |
| `dividers`    | exibe divisores entre grupos                     | `boolean`                             | `false` |
| `onSelect`    | função chamada ao selecionar um item             | `(item: AiCommandItemConfig) => void` | —       |
