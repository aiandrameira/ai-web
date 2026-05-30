# API

[AiSelect] - Component

> O `[ai-select]` é um componente de seleção que oferece uma interface para escolher opções de uma lista, com suporte a seleção única ou múltipla, rótulos personalizados e placeholders.

### Propriedades

| Property        | Description                                                         | Type                 | Default    |
| --------------- | ------------------------------------------------------------------- | -------------------- | ---------- |
| `label`         | define o rótulo                                                     | `string`             | `""`       |
| `placeholder`   | define o placeholder                                                | `string`             | `""`       |
| `disabled`      | desabilita o select                                                 | `boolean`            | `false`    |
| `multiple`      | habilita seleção múltipla                                           | `boolean`            | `false`    |
| `maxLabelCount` | número máximo de labels a serem exibidas quando em seleção múltipla | `number`             | `3`        |
| `[(value)]`     | define o valor selecionado                                          | `string \| string[]` | `"" \| []` |
| `class`         | classes CSS adicionais                                              | `ClassValue`         | `""`       |

[AiSelectItem] - Component

> O `[ai-select-item]` é um componente filho do `[ai-select]` que representa uma opção individual na lista de seleção, com suporte a rótulos personalizados e desabilitação.

| Property   | Description            | Type         | Default |
| ---------- | ---------------------- | ------------ | ------- |
| `value`    | define o valor         | `string`     | `""`    |
| `disabled` | desabilita o select    | `boolean`    | `false` |
| `class`    | classes CSS adicionais | `ClassValue` | `""`    |
