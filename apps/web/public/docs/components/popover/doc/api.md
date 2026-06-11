# API

[AiPopoverDirective] - Directive

> O `[aiPopover]` é uma diretiva aplicada ao elemento gatilho que gerencia a criação do overlay, posicionamento e ciclo de vida do popover. O conteúdo é projetado via `ng-template` e referenciado pela propriedade `content`.

### Propriedades

| Propriedade | Descrição                                              | Tipo                          | Default    |
| ----------- | ------------------------------------------------------ | ----------------------------- | ---------- |
| `content`   | referência ao template que será exibido no popover     | `TemplateRef<unknown>`        | —          |
| `trigger`   | define o modo de acionamento                           | `click \| hover \| null`      | `click`    |
| `position`  | define o lado em que o popover será exibido            | `top \| bottom \| left \| right` | `bottom` |
| `visible`   | controla a visibilidade de forma programática          | `boolean`                     | `false`    |
| `close`     | fecha ao clicar fora (apenas no modo `click`)          | `boolean`                     | `true`     |
| `origin`    | elemento de referência alternativo para posicionamento | `ElementRef`                  | —          |

### Eventos

| Evento          | Descrição                                    | Tipo                    |
| --------------- | -------------------------------------------- | ----------------------- |
| `visibleChange` | emitido quando a visibilidade do popover muda | `EventEmitter<boolean>` |

---

[AiPopover] - Component

> `ai-popover` é o contêiner de conteúdo do popover. Aplica os estilos de fundo, borda, sombra e animações de entrada e saída. Deve ser usado dentro do `ng-template` referenciado pela diretiva `[aiPopover]`.

### Propriedades

| Propriedade | Descrição              | Tipo     | Default |
| ----------- | ---------------------- | -------- | ------- |
| `class`     | classes CSS adicionais | `string` | `""`    |
