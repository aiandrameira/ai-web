# API

[AlertDialogService] - Service

> O `AlertDialogService` é um serviço utilizado para criar e controlar diálogos de alerta.

### Propriedades

| Propriedade | Descrição                           |
| ----------- | ----------------------------------- |
| `create`    | abre um Alert Dialog genérico       |
| `confirm`   | abre um Alert Dialog de confirmação |

---

[AiAlertDialogRef] - Classe

> O `AiAlertDialogRef` é uma classe utilizada para criar e controlar diálogos de alerta.

### Propriedades

| Propriedade   | Descrição                                                       |
| ------------- | --------------------------------------------------------------- |
| `close`       | fecha o Alert Dialog                                            |
| `afterClosed` | retorna um Observable que emite quando o Alert Dialog é fechado |

---

[AiAlertDialogConfig] - Interface

> A `AiAlertDialogConfig` é uma interface que define as opções de configuração para um Alert Dialog.

### Propriedades

| Propriedade          | Descrição                                           | Tipo                                                                    | Default     |
| -------------------- | --------------------------------------------------- | ----------------------------------------------------------------------- | ----------- |
| `icon`               | define o ícone                                      | `{ name: AiIconType, color?: "primary" \| "warning" \| "destructive" }` | `""`        |
| `title`              | define o título                                     | `string \| TemplateRef<T>`                                              | `""`        |
| `description`        | define a description                                | `string`                                                                | `""`        |
| `component`          | define o componente ou conteúdo                     | `string \| TemplateRef<T> \| Type<T>`                                   | `""`        |
| `data`               | define dados adicionais                             | `object`                                                                | `null`      |
| `confirmText`        | define o rótulo do botão de confirmar               | `string \| null`                                                        | `Confirmar` |
| `cancelText`         | define o rótulo do botão de cancelar                | `string \| null`                                                        | `Cancelar`  |
| `confirmDestructive` | define se o botão de confirmar é destrutivo         | `boolean`                                                               | `false`     |
| `confirmDisabled`    | define se o botão de confirmar está desabilitado    | `boolean`                                                               | `false`     |
| `closable`           | define se o diálogo pode ser fechado                | `boolean`                                                               | `true`      |
| `width`              | define a largura do diálogo                         | `string`                                                                | `"400px"`   |
| `customClasses`      | classes CSS adicionais                              | `ClassValue`                                                            | `""`        |
| `maskClosable`       | define se o diálogo pode ser fechado ao clicar fora | `boolean`                                                               | `false`     |
| `onConfirm`          | evento disparado ao confirmar o diálogo             | `EventEmitter<T> \| onClickCallback<T>`                                 | `-`         |
| `onCancel`           | evento disparado ao cancelar o diálogo              | `EventEmitter<T> \| onClickCallback<T>`                                 | `-`         |
| `viewContainerRef`   | define o ViewContainerRef para o diálogo            | `ViewContainerRef`                                                      | `-`         |
