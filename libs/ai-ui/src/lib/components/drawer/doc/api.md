# API

[AiDrawerService] - Service

> `AiDrawerService` é o serviço responsável por abrir o drawer programaticamente. Recebe um `AiDrawerConfig<T>` e retorna um `AiDrawerRef` para controlar o ciclo de vida e obter o resultado ao fechar.

```ts
const drawerRef = this.#drawerService.open({
    component: MeuComponenteComponent,
    title: "Título do drawer",
    position: "right",
    data: { id: 1 },
});

drawerRef.afterClosed().subscribe(result => console.log(result));
```

---

[AiDrawerConfig] - Interface

> `AiDrawerConfig<T>` define todas as opções de configuração para abertura do drawer. O campo `component` é obrigatório — deve ser o componente que será renderizado dentro do painel.

### Propriedades

| Propriedade       | Descrição                                                   | Tipo                                    | Default |
| ----------------- | ----------------------------------------------------------- | --------------------------------------- | ------- |
| `component`       | componente renderizado dentro do drawer                     | `ComponentType<T>`                      | —       |
| `title`           | título exibido no cabeçalho                                 | `string \| TemplateRef<T>`              | —       |
| `icon`            | ícone exibido ao lado do título                             | `AiIconType`                            | —       |
| `position`        | lado da tela onde o drawer aparece                          | `left \| top \| right \| bottom`        | `right` |
| `width`           | largura do painel (CSS)                                     | `string`                                | `400px` |
| `height`          | altura do painel (CSS)                                      | `string`                                | `100%`  |
| `data`            | dados passados ao componente via `AI_DRAWER_DATA`           | `object`                                | —       |
| `customClasses`   | classes CSS adicionais aplicadas ao painel                  | `string`                                | —       |
| `hideActions`     | oculta a barra de ações com os botões de confirmar/cancelar | `boolean`                               | `false` |
| `closable`        | exibe o botão de fechar no cabeçalho                        | `boolean`                               | `true`  |
| `disableClose`    | impede o fechamento ao clicar no backdrop                   | `boolean`                               | `false` |
| `confirmText`     | rótulo do botão de confirmação                              | `string \| null`                        | —       |
| `confirmIcon`     | ícone do botão de confirmação                               | `AiIconType`                            | —       |
| `confirmDisabled` | desabilita o botão de confirmação                           | `boolean`                               | `false` |
| `cancelText`      | rótulo do botão de cancelamento                             | `string \| null`                        | —       |
| `cancelIcon`      | ícone do botão de cancelamento                              | `AiIconType`                            | —       |
| `onConfirm`       | callback ou `EventEmitter` acionado ao confirmar            | `EventEmitter<T> \| OnClickCallback<T>` | —       |
| `onCancel`        | callback ou `EventEmitter` acionado ao cancelar             | `EventEmitter<T> \| OnClickCallback<T>` | —       |

---

[AiDrawerRef] - Class

> `AiDrawerRef<T>` é a referência retornada por `AiDrawerService.open()`. Permite fechar o drawer programaticamente e observar o resultado emitido ao fechar.

### Métodos

| Método          | Descrição                                              | Retorno                      |
| --------------- | ------------------------------------------------------ | ---------------------------- |
| `close(result)` | fecha o drawer e emite o resultado para `afterClosed`  | `void`                       |
| `afterClosed()` | observable que emite o resultado quando o drawer fecha | `Observable<T \| undefined>` |

---

### InjectionToken

> `AI_DRAWER_DATA` - Token de injeção que disponibiliza os dados passados via `AiDrawerConfig.data` dentro do componente renderizado no drawer.

```ts
@Component({ ... })
export class MeuComponenteComponent {
    protected data = inject(AI_DRAWER_DATA);
}
```
