# API

[AiBreadcrumb] - Component

> O `[ai-breadcrumb]` é um componente flexível e acessível que encapsula todos os outros componentes do breadcrumb, é através dele que conseguimos configurar os items através do roteamento.

### Propriedades

| Propriedade       | Descrição                                                  | Tipo                                                  | Default          |
| ----------------- | ---------------------------------------------------------- | ----------------------------------------------------- | ---------------- |
| `size`            | define o tamanho                                           | `sm \| default \| lg \| xl`                           | `default`        |
| `customSeparator` | customiza o ícone do divisor                               | `AiIconType` [**Remix Icon**](https://remixicon.com/) | `""`             |
| `maxItems`        | define o número máximo de itens visíveis antes de colapsar | `number`                                              | `0` (sem limite) |
| `class`           | classes CSS adicionais                                     | `ClassValue`                                          | `""`             |

---

[AiBreadcrumbContent] - Component

> `[ai-breadcrumb-content]` é um componente flexível e acessível que renderiza uma trilha de navegação e envolve sua lista de itens.

### Propriedades

| Propriedade | Descrição              | Tipo                        | Default   |
| ----------- | ---------------------- | --------------------------- | --------- |
| `size`      | define o tamanho       | `sm \| default \| lg \| xl` | `default` |
| `class`     | classes CSS adicionais | `ClassValue`                | `""`      |

---

[AiBreadcrumbList] - Component

> `[ai-breadcrumb-list]` renderiza o contêiner para itens de trilha de navegação. Normalmente usado dentro do `[ai-breadcrumb-content]` para controlar o layout e o espaçamento.

### Propriedades

| Propriedade | Descrição                      | Tipo                     | Default |
| ----------- | ------------------------------ | ------------------------ | ------- |
| `align`     | define o alinhamento           | `start \| center \| end` | `start` |
| `wrap`      | comportamento de empacotamento | `wrap \| nowrap`         | `wrap`  |
| `class`     | classes CSS adicionais         | `ClassValue`             | `""`    |

---

[AiBreadcrumbItem] - Component

> `[ai-breadcrumb-item]` representa um único item na trilha de navegação e, opcionalmente, inclui um separador.

### Propriedades

| Propriedade | Descrição              | Tipo                                 | Default   |
| ----------- | ---------------------- | ------------------------------------ | --------- |
| `variant`   | define o estilo        | `default \| muted \| bold \| subtle` | `default` |
| `shape`     | define o formato       | `default \| default \| rounded`      | `default` |
| `class`     | classes CSS adicionais | `ClassValue`                         | `""`      |

---

[AiBreadcrumbLink] - Component

> `[ai-breadcrumb-link]` é uma âncora estilizada usada dentro de `[ai-breadcrumb-item]` para navegar entre níveis.

### Propriedades

| Propriedade | Descrição                         | Tipo                             | Default   |
| ----------- | --------------------------------- | -------------------------------- | --------- |
| `variant`   | define o estilo                   | `default \| underline \| subtle` | `default` |
| `link`      | define o link de redirecionamento | `default \| underline \| subtle` | `default` |
| `class`     | classes CSS adicionais            | `ClassValue`                     | `""`      |

---

[AiBreadcrumbPage] - Component

> `[ai-breadcrumb-page]` indica a página atual na trilha de navegação e renderiza com `aria-current="page"` para acessibilidade.

### Propriedades

| Propriedade | Descrição              | Tipo                                        | Default   |
| ----------- | ---------------------- | ------------------------------------------- | --------- |
| `variant`   | define o estilo        | `default \| underline \| subtle \| current` | `default` |
| `class`     | classes CSS adicionais | `ClassValue`                                | `""`      |

---

[AiBreadcrumbSeparator] - Component

> `[ai-breadcrumb-separator]` exibe um separador visual entre itens de trilha de navegação e suporta entradas de string e modelo.

### Propriedades

| Propriedade | Descrição              | Tipo                           | Default   |
| ----------- | ---------------------- | ------------------------------ | --------- |
| `variant`   | define o estilo        | `default \| strong \| primary` | `default` |
| `class`     | classes CSS adicionais | `ClassValue`                   | `""`      |

---

[AiBreadcrumbActionsDirective] - Directive

> `[aiBreadcrumbActions]` é uma diretiva usada para definir ações personalizadas dentro da trilha de navegação.

```html
<div class="flex flex-col gap-y-6">
    <ng-template aiBreadcrumbActions>
        <!-- Ações (buttons ou badges) personalizadas aqui -->
    </ng-template>
</div>
```

---

[AiBreadcrumbConfig] - Interface

> A interface `AiBreadcrumbConfig` define as opções de configuração para o componente de breadcrumb, permitindo personalização global.

### Propriedades

| Propriedade | Descrição                      | Tipo                                                  | Default   |
| ----------- | ------------------------------ | ----------------------------------------------------- | --------- |
| `path`      | define o caminho do breadcrumb | `string`                                              | `default` |
| `icon`      | define o ícone do breadcrumb   | `AiIconType` [**Remix Icon**](https://remixicon.com/) | `""`      |
| `label`     | define o rótulo do breadcrumb  | `string`                                              | `""`      |
