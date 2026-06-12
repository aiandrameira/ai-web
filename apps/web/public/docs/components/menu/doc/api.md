# API

[AiMenuDirective] - Directive

> O `[ai-menu]` é uma diretiva aplicada ao elemento gatilho que controla a abertura e o fechamento do menu. Ela recebe uma referência para um `[ai-menu-content]` e gerencia o overlay, posicionamento e navegação por teclado.

### Propriedades

| Propriedade | Descrição                        | Tipo             | Default |
| ----------- | -------------------------------- | ---------------- | ------- |
| `aiMenu`    | referência ao conteúdo do menu   | `AiMenuContent`  | —       |
| `trigger`   | define o modo de acionamento     | `click \| hover` | `click` |
| `disabled`  | define se o gatilho está inativo | `boolean`        | `false` |

---

[AiMenu] - Component

> O `ai-dropdown-menu` é uma versão autônoma do menu que encapsula o gatilho e o conteúdo em um único componente. O gatilho é projetado via `[menu-trigger]`.

### Propriedades

| Propriedade | Descrição              | Tipo         | Default |
| ----------- | ---------------------- | ------------ | ------- |
| `disabled`  | desabilita o menu      | `boolean`    | `false` |
| `class`     | classes CSS adicionais | `ClassValue` | `""`    |

### Eventos

| Evento       | Descrição                    | Tipo                    |
| ------------ | ---------------------------- | ----------------------- |
| `changeOpen` | emitido quando o estado muda | `EventEmitter<boolean>` |

---

[AiMenuContent] - Component

> `[ai-menu-content]` é o contêiner do conteúdo do menu. Deve ser referenciado pela diretiva `[ai-menu]` para que o overlay seja posicionado corretamente.

### Propriedades

| Propriedade | Descrição              | Tipo         | Default |
| ----------- | ---------------------- | ------------ | ------- |
| `class`     | classes CSS adicionais | `ClassValue` | `""`    |

---

[AiMenuItem] - Component

> `[ai-menu-item]` representa uma ação individual dentro do menu. Fecha o menu automaticamente ao ser clicado e suporta estado desabilitado.

### Propriedades

| Propriedade | Descrição                         | Tipo                     | Default   |
| ----------- | --------------------------------- | ------------------------ | --------- |
| `variant`   | define o estilo visual            | `default \| destructive` | `default` |
| `inset`     | adiciona recuo à esquerda         | `boolean`                | `false`   |
| `disabled`  | desabilita a interação com o item | `boolean`                | `false`   |
| `class`     | classes CSS adicionais            | `ClassValue`             | `""`      |

---

[AiMenuLabel] - Component

> `[ai-menu-label]` exibe um rótulo de seção dentro do menu, útil para agrupar itens relacionados visualmente.

### Propriedades

| Propriedade | Descrição                 | Tipo         | Default |
| ----------- | ------------------------- | ------------ | ------- |
| `inset`     | adiciona recuo à esquerda | `boolean`    | `false` |
| `class`     | classes CSS adicionais    | `ClassValue` | `""`    |

---

[AiMenuShortcut] - Component

> `[ai-menu-shortcut]` exibe um atalho de teclado à direita de um item de menu. Deve ser usado como filho de `[ai-menu-item]`.

### Propriedades

| Propriedade | Descrição              | Tipo         | Default |
| ----------- | ---------------------- | ------------ | ------- |
| `class`     | classes CSS adicionais | `ClassValue` | `""`    |
