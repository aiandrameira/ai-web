# API

[AiInput] - Component

> O `[ai-input]` é um componente de campo de entrada versátil que suporta diferentes tipos de dados, variações de estilo, ícones e funcionalidades adicionais como máscaras e normalização.

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

> Configurações para a funcionalidade de máscara do AiInput, baseada na biblioteca IMask.

| Property     | Description                      | Type           | Default |
| ------------ | -------------------------------- | -------------- | ------- |
| `mask`       | define a máscara                 | `string`       | `""`    |
| `maskConfig` | define a configuração da máscara | `AiMaskConfig` | `null`  |

[AiMaskConfig] - Interface

```ts
interface AiMaskConfig {
    thousands?: string;
    decimal?: "." | "," | [".", ","];
    prefix?: string;
    align?: "left" | "right";
    dropSpecialCharacters?: boolean | string[] | (string[] | null);
    specialCharacters?: string[];
    isCurrency?: boolean;
    patterns?: any;
}
```

### Normalize

> Tipos de normalização suportados pelo AiInput, permitindo transformar o valor de entrada em formatos específicos como apenas letras, números ou letras maiúsculas.

| Property          | Description                           | Type                | Default |
| ----------------- | ------------------------------------- | ------------------- | ------- |
| `normalize`       | define a normalização                 | `AiNormalizeType`   | `null`  |
| `normalizeConfig` | define a configuração da normalização | `AiNormalizeConfig` | `null`  |

[AiNormalizeConfig] - Interface

```ts
interface AiNormalizeConfig {
    hyphen?: boolean;
    underscore?: boolean;
    dot?: boolean;
}
```

---

[AiNormalizeType] - Type

```ts
type AiNormalizeType = "alfa" | "alfanum" | "numeric" | "uppercase";
```
