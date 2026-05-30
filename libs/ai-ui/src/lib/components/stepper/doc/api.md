# API

[AiStepper] - Component

> O `<ai-stepper>` é o container principal que gerencia a navegação e o estado das etapas.

### Propriedades

| Propriedade   | Descrição                                                     | Tipo                         | Default        |
| ------------- | ------------------------------------------------------------- | ---------------------------- | -------------- |
| `orientation` | define a orientação do stepper                                | `"horizontal" \| "vertical"` | `"horizontal"` |
| `linear`      | se verdadeiro, exige completar a etapa atual antes de avançar | `boolean`                    | `false`        |
| `class`       | classes CSS adicionais                                        | `ClassValue`                 | `""`           |

### Eventos

| Evento            | Descrição                  | Tipo     |
| ----------------- | -------------------------- | -------- |
| `selectionChange` | emitido ao trocar de etapa | `number` |

### Métodos

| Método       | Descrição                    | Parâmetros |
| ------------ | ---------------------------- | ---------- |
| `next()`     | navega para a próxima etapa  | -          |
| `previous()` | navega para a etapa anterior | -          |

---

[AiStep] - Component

> O `<ai-step>` representa uma etapa individual do stepper.

### Propriedades

| Propriedade | Descrição                                       | Tipo      | Default |
| ----------- | ----------------------------------------------- | --------- | ------- |
| `label`     | título da etapa exibido no header (obrigatório) | `string`  | -       |
| `optional`  | indica se a etapa é opcional                    | `boolean` | `false` |
| `completed` | marca a etapa como completa manualmente         | `boolean` | `false` |
| `editable`  | permite reabrir a etapa após completada         | `boolean` | `true`  |
