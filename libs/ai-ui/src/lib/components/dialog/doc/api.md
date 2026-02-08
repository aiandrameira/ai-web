# API

## `AiDialogService` - Service

### Propriedades

| Propriedade          | Descrição                                           | Tipo                                    | Default     |
| -------------------- | --------------------------------------------------- | --------------------------------------- | ----------- |
| `cancelIcon`         | define o ícone do botão de cancelar                 | `AiIconType`                            | `-`         |
| `cancelText`         | define o rótulo do botão de cancelar                | `string \| null`                        | `Cancelar`  |
| `confirmIcon`        | define o ícone do botão de confirmar                | `AiIconType`                            | `-`         |
| `confirmText`        | define o rótulo do botão de confirmar               | `string \| null`                        | `Confirmar` |
| `closable`           | define se o diálogo pode ser fechado                | `boolean`                               | `true`      |
| `component`          | define o componente                                 | `string \| TemplateRef<T> \| Type<T>`   | `""`        |
| `customClasses`      | classes CSS adicionais                              | `ClassValue`                            | `""`        |
| `data`               | define dados adicionais                             | `object`                                | `{}`        |
| `title`              | define o título                                     | `string \| TemplateRef<T>`              | `""`        |
| `description`        | define a descrição                                  | `string`                                | `""`        |
| `hideFooter`         | define se o rodapé do diálogo está oculto           | `boolean`                               | `false`     |
| `maskClosable`       | define se o diálogo pode ser fechado ao clicar fora | `boolean`                               | `false`     |
| `confirmDestructive` | define se o botão de confirmar é destrutivo         | `boolean`                               | `false`     |
| `confirmDisabled`    | define se o botão de confirmar está desabilitado    | `boolean`                               | `false`     |
| `width`              | define a largura do diálogo                         | `string`                                | `"400px"`   |
| `onConfirm`          | evento disparado ao confirmar o diálogo             | `EventEmitter<T> \| onClickCallback<T>` | `-`         |
| `onCancel`           | evento disparado ao cancelar o diálogo              | `EventEmitter<T> \| onClickCallback<T>` | `-`         |
| `viewContainerRef`   | define o ViewContainerRef para o diálogo            | `ViewContainerRef`                      | `-`         |
