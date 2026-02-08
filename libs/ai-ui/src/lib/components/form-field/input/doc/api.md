# API

## `[ai-input]` - Component

### Propriedades

| Property      | Description                       | Type                                                  | Default    |
| ------------- | --------------------------------- | ----------------------------------------------------- | ---------- |
| `label`       | define o rótulo                   | `string`                                              | `""`       |
| `id`          | define o id                       | `string`                                              | `""`       |
| `variant`     | define o formato                  | `"filled" \| "outlined" \| "standard"`                | `outlined` |
| `maxlength`   | define o maxlength                | `string \| number`                                    | `""`       |
| `minlength`   | define o minlength                | `string \| number`                                    | `""`       |
| `placeholder` | define o placeholder              | `string`                                              | `""`       |
| `type`        | define o tipo                     | `text \| number \| email \| password`                 | `text`     |
| `icon`        | define o ícone                    | `AiIconType` [**Remix Icon**](https://remixicon.com/) | `""`       |
| `strength`    | define se mostra a força da senha | `boolean, string \| boolean`                          | `false`    |
| `class`       | classes CSS adicionais            | `ClassValue`                                          | `""`       |

### Eventos

| Event        | Description               | Type                 |
| ------------ | ------------------------- | -------------------- |
| `changeIcon` | evento ao clicar no ícone | `EventEmitter<void>` |

### Máscaras

| Property     | Description                      | Type           | Default |
| ------------ | -------------------------------- | -------------- | ------- |
| `mask`       | define a máscara                 | `string`       | `""`    |
| `maskConfig` | define a configuração da máscara | `IMaskOptions` | `null`  |

### Normalize

| Property          | Description                           | Type              | Default |
| ----------------- | ------------------------------------- | ----------------- | ------- |
| `normalize`       | define a normalização                 | `NormalizeType`   | `null`  |
| `normalizeConfig` | define a configuração da normalização | `NormalizeConfig` | `null`  |
