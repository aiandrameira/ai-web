# API

[AiSegmented] - Component

> O `ai-segmented` é um componente de controle segmentado que permite ao usuário selecionar uma opção entre várias, com suporte a ícones, rótulos e diferentes tamanhos.

### Propriedades

| Propriedade    | Descrição                                   | Tipo                        | Default  |
| -------------- | ------------------------------------------- | --------------------------- | -------- |
| `items`        | define os itens do segmented                | `AiSegmentedItem[]`         | `[]`     |
| `size`         | define o tamanho                            | `"sm" \| "normal" \| "lg"` | `normal` |
| `defaultValue` | define o valor padrão                       | `string`                    | `""`     |
| `value`        | define o valor selecionado                  | `string`                    | `""`     |
| `disabled`     | define se o segmented está desabilitado     | `boolean`                   | `false`  |
| `class`        | classes CSS adicionais                      | `ClassValue`                | `""`     |

### Eventos

| Evento        | Descrição                                              | Tipo                    |
| ------------- | ------------------------------------------------------ | ----------------------- |
| `valueChange` | emite quando o valor selecionado é alterado            | `OutputEmitter<string>` |

---

[AiSegmentedItem] - Interface

> Interface que define a estrutura de cada item do `ai-segmented`.

| Propriedade | Descrição                            | Tipo      | Obrigatório |
| ----------- | ------------------------------------ | --------- | ----------- |
| `value`     | valor do item                        | `string`  | Sim         |
| `label`     | rótulo exibido                       | `string`  | Não         |
| `icon`      | nome do ícone                        | `string`  | Não         |
| `disabled`  | define se o item está desabilitado   | `boolean` | Não         |
