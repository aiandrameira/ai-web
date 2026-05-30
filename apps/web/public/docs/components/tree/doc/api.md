# API

[AiTree] - Component

> O `[ai-tree]` é um componente de árvore hierárquica para exibir dados aninhados.

### Propriedades

| Propriedade | Descrição              | Tipo           | Default |
| ----------- | ---------------------- | -------------- | ------- |
| `nodes`     | lista de nós da árvore | `AiTreeNode[]` | -       |
| `class`     | classes CSS adicionais | `ClassValue`   | `""`    |

### Eventos

| Evento       | Descrição                       | Tipo                           |
| ------------ | ------------------------------- | ------------------------------ |
| `nodeSelect` | emitido ao selecionar um nó     | `OutputEmitterRef<AiTreeNode>` |
| `nodeToggle` | emitido ao expandir/recolher nó | `OutputEmitterRef<AiTreeNode>` |

---

[AiTreeNode] - Interface

| Propriedade | Descrição                | Tipo              | Obrigatório |
| ----------- | ------------------------ | ----------------- | ----------- |
| `label`     | texto exibido do nó      | `string`          | Sim         |
| `icon`      | ícone exibido no nó      | `AiIconType`      | Não         |
| `data`      | dados adicionais do nó   | `T`               | Não         |
| `expanded`  | estado expandido inicial | `boolean`         | Não         |
| `selected`  | estado selecionado       | `boolean`         | Não         |
| `children`  | nós filhos               | `AiTreeNode<T>[]` | Não         |
