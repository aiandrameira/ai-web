# API

[AiTabsGroup] - Component

> O <ai-tabs-group> é um componente que possui um contâiner principal que gerencia um conjunto de abas.

### Propriedades

| Propriedade      | Descrição                         | Tipo                                     | Default    |
| ---------------- | --------------------------------- | ---------------------------------------- | ---------- |
| `tabsPosition`   | posição das abas                  | `"top" \| "bottom" \| "left" \| "right"` | `"top"`    |
| `activePosition` | posição do indicador da aba ativa | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` |
| `alignTabs`      | alinhamento das abas              | `"start" \| "center" \| "end"`           | `"start"`  |
| `class`          | classes CSS adicionais            | `ClassValue`                             | `""`       |

### Eventos

| Evento      | Descrição                | Tipo                               |
| ----------- | ------------------------ | ---------------------------------- |
| `changeTab` | emitido ao trocar de aba | `{ index: number; label: string }` |

---

[AiTab] - Component

> O <ai-tab> é um componente que representa uma aba individual.

### Propriedades

| Propriedade | Descrição                   | Tipo      | Default |
| ----------- | --------------------------- | --------- | ------- |
| `label`     | rótulo da aba (obrigatório) | `string`  | -       |
| `disabled`  | desabilitar a aba           | `boolean` | `false` |
