# API

[AiDatePicker] - Component

> O `ai-date-picker` é um componente de seleção de data com calendário popup, com suporte a limites de data e formatação.

### Propriedades

| Propriedade   | Descrição                              | Tipo         | Default              |
| ------------- | -------------------------------------- | ------------ | -------------------- |
| `id`          | define o identificador                 | `string`     | `""`                 |
| `placeholder` | define o texto de placeholder          | `string`     | `"Selecione a data"` |
| `format`      | define o formato de exibição           | `string`     | `"yyyy-MM-dd"`       |
| `minDate`     | define a data mínima (yyyy-MM-dd)      | `string`     | `""`                 |
| `maxDate`     | define a data máxima (yyyy-MM-dd)      | `string`     | `""`                 |
| `value`       | define a data selecionada (yyyy-MM-dd) | `string`     | `""`                 |
| `disabled`    | define se o campo está desabilitado    | `boolean`    | `false`              |
| `class`       | classes CSS adicionais                 | `ClassValue` | `""`                 |

### Eventos

| Evento        | Descrição                              | Tipo                    |
| ------------- | -------------------------------------- | ----------------------- |
| `valueChange` | emite quando uma data é selecionada    | `OutputEmitter<string>` |
