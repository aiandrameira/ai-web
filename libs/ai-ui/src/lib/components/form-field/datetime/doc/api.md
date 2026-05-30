# API

[AiDatetime] - Component

> O `ai-datetime` é um componente de input para seleção de datas e horários, com suporte a diferentes tipos e validações.

### Propriedades

| Propriedade | Descrição                           | Tipo                                              | Default  |
| ----------- | ----------------------------------- | ------------------------------------------------- | -------- |
| `id`        | define o identificador              | `string`                                          | `""`     |
| `label`     | define o rótulo do campo            | `string`                                          | `""`     |
| `type`      | define o tipo do campo              | `"date" \| "time" \| "month" \| "datetime-local"` | `"date"` |
| `minDate`   | define a data/hora mínima           | `string`                                          | `""`     |
| `maxDate`   | define a data/hora máxima           | `string`                                          | `""`     |
| `value`     | define o valor do campo             | `string`                                          | `""`     |
| `disabled`  | define se o campo está desabilitado | `boolean`                                         | `false`  |
| `readonly`  | define se o campo é somente leitura | `boolean`                                         | `false`  |
| `required`  | define se o campo é obrigatório     | `boolean`                                         | `false`  |
| `class`     | classes CSS adicionais              | `ClassValue`                                      | `""`     |

### Eventos

| Evento        | Descrição                       | Tipo                    |
| ------------- | ------------------------------- | ----------------------- |
| `valueChange` | emite quando o valor é alterado | `OutputEmitter<string>` |
