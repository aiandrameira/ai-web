# API

## `[ai-command]` - Component

> `ai-command` é um componente flexível e acessível que encapsula todos os outros componentes do command, gerenciando o estado da busca, filtro e navegação de itens.

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

## `[ai-command-input]` - Component

> `ai-command-input` é um componente que fornece o campo de entrada para busca de comandos e implementa ControlValueAccessor para integração com formulários.

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

## `[ai-command-list]` - Component

> `ai-command-list` renderiza o contêiner para itens e grupos de comandos. Normalmente usado dentro de `ai-command` para controlar o layout da lista.

### Propriedades

| Propriedade | Descrição              | Tipo         | Default |
| ----------- | ---------------------- | ------------ | ------- |
| `class`     | classes CSS adicionais | `ClassValue` | `""`    |

---

## `[ai-command-item]` - Component

> `ai-command-item` representa um único comando na paleta e pode conter ícones, labels, atalhos e estados desabilitados.

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

## `[ai-command-item-group]` - Component

> `ai-command-item-group` agrupa itens de comando com um rótulo e gerencia a visibilidade dos itens baseado na busca.

### Propriedades

| Propriedade | Descrição                     | Tipo         | Default |
| ----------- | ----------------------------- | ------------ | ------- |
| `label`     | rótulo do grupo (obrigatório) | `string`     | —       |
| `class`     | classes CSS adicionais        | `ClassValue` | `""`    |

---

## `[ai-command-separator]` - Component

> `ai-command-separator` exibe um separador visual entre grupos de comandos.

### Propriedades

| Propriedade | Descrição              | Tipo         | Default |
| ----------- | ---------------------- | ------------ | ------- |
| `class`     | classes CSS adicionais | `ClassValue` | `""`    |

---

## `[ai-command-empty]` - Component

> `ai-command-empty` exibe uma mensagem quando nenhum comando é encontrado na busca.

### Propriedades

| Propriedade | Descrição              | Tipo         | Default |
| ----------- | ---------------------- | ------------ | ------- |
| `class`     | classes CSS adicionais | `ClassValue` | `""`    |

---

## Interfaces

### `AiCommandItemConfig`

```typescript
interface AiCommandItemConfig {
    value: string | unknown;
    label: string;
    disabled?: boolean;
    command?: string;
    shortcut?: string;
    icon?: AiIconType;
    action?: () => void;
    key?: string;
}
```

Representa a configuração de um item de comando.

### `AiCommandGroup`

```typescript
interface AiCommandGroup {
    label: string;
    items: AiCommandItemConfig[];
}
```

Representa um grupo de comandos com label.

### `AiCommandConfig`

```typescript
interface AiCommandConfig {
    placeholder?: string;
    emptyText?: string;
    groups: AiCommandGroup[];
    dividers?: boolean;
    onSelect?: (item: AiCommandItemConfig) => void;
}
```

Configuração geral do componente command.
