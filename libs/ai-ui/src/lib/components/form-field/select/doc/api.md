# API

## `[ai-select]` - Component

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

## `[ai-select-item]` - Component

| Property   | Description            | Type         | Default |
| ---------- | ---------------------- | ------------ | ------- |
| `value`    | define o valor         | `string`     | `""`    |
| `disabled` | desabilita o select    | `boolean`    | `false` |
| `class`    | classes CSS adicionais | `ClassValue` | `""`    |
