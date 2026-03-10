# API

[AiTooltip] - Directive

> O `[ai-tooltip]` é uma diretiva que adiciona um tooltip a um elemento com suporte a múltiplas posições, triggers e delays personalizáveis.

### Propriedades

| Propriedade         | Descrição                              | Tipo                                     | Default   |
| ------------------- | -------------------------------------- | ---------------------------------------- | --------- |
| `aiTooltip`         | define o conteúdo                      | `string \| TemplateRef<any>`             | `""`      |
| `aiTooltipPosition` | define a posição                       | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'`   |
| `aiTrigger`         | define o gatilho para exibir o tooltip | `'hover' \| 'click'`                     | `'hover'` |
| `aiShowDelay`       | define o delay para exibir o tooltip   | `number`                                 | `0`       |
| `aiHideDelay`       | define o delay para esconder o tooltip | `number`                                 | `0`       |

### Eventos

| Evento | Descrição                                     | Tipo                 |
| ------ | --------------------------------------------- | -------------------- |
| `show` | Evento disparado quando o tooltip é exibido   | `EventEmitter<void>` |
| `hide` | Evento disparado quando o tooltip é escondido | `EventEmitter<void>` |
