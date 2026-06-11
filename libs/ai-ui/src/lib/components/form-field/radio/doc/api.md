# API

[AiRadioGroup] - Component

> O `ai-radio-group` é um contêiner para agrupar botões de rádio, gerenciando a seleção única entre eles.

### Propriedades

| Propriedade | Descrição                              | Tipo         | Default |
| ----------- | -------------------------------------- | ------------ | ------- |
| `value`     | define o valor selecionado             | `T \| null`  | `null`  |
| `touched`   | define se o grupo foi tocado           | `boolean`    | `false` |
| `disabled`  | define se o grupo está desabilitado    | `boolean`    | `false` |
| `invalid`   | define se o grupo está inválido        | `boolean`    | `false` |
| `readonly`  | define se o grupo está somente leitura | `boolean`    | `false` |
| `required`  | define se o grupo é obrigatório        | `boolean`    | `false` |
| `class`     | classes CSS adicionais                 | `ClassValue` | `""`    |

### Eventos

| Evento        | Descrição                                   | Tipo                       |
| ------------- | ------------------------------------------- | -------------------------- |
| `valueChange` | emite quando o valor selecionado é alterado | `OutputEmitter<T \| null>` |

---

[AiRadio] - Component

> O `ai-radio` é um botão de rádio individual, utilizado dentro de um `ai-radio-group`.

### Propriedades

| Propriedade | Descrição                             | Tipo                                     | Default   |
| ----------- | ------------------------------------- | ---------------------------------------- | --------- |
| `value`     | define o valor do radio (obrigatório) | `T`                                      | -         |
| `variant`   | define o estilo                       | `"primary" \| "accent" \| "destructive"` | `primary` |
| `size`      | define o tamanho                      | `"default" \| "lg"`                      | `default` |
| `disabled`  | define se o radio está desabilitado   | `boolean`                                | `false`   |
| `class`     | classes CSS adicionais                | `ClassValue`                             | `""`      |
