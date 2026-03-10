# API

[AiToast] - Component

> O `[ai-toast]` é um componente de notificação que exibe mensagens temporárias em diferentes posições do ecrã com estilos variados.

### Propriedades

| Propriedade | Descrição                                             | Tipo                | Default |
| ----------- | ----------------------------------------------------- | ------------------- | ------- |
| `positions` | define as posições disponíveis para exibição do toast | `AiToastPosition[]` | `[]`    |

---

[AiToastContent] - Component

> O `[ai-toast-content]` é um componente interno usado para renderizar o conteúdo de cada toast, incluindo mensagem, descrição e ícone.

### Propriedades

| Propriedade | Descrição                              | Tipo            | Default |
| ----------- | -------------------------------------- | --------------- | ------- |
| `toast`     | define os dados do toast a ser exibido | `AiToastConfig` | `-`     |

### Eventos

| Evento | Descrição                                | Tipo                   |
| ------ | ---------------------------------------- | ---------------------- |
| `undo` | evento emitido quando o toast é removido | `EventEmitter<number>` |

---

[AiToastService] - Service

> O `AiToastService` é um serviço para criar e gerenciar toasts programaticamente, permitindo exibir mensagens de forma dinâmica.

### Propriedades

| Propriedade   | Descrição                                            | Tipo                                                                                  | Default         |
| ------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------- | --------------- |
| `message`     | define a mensagem principal a ser exibida            | `string \| unknown`                                                                   | `""`            |
| `description` | define um texto adicional exibido abaixo da mensagem | `string`                                                                              | `""`            |
| `type`        | define o estilo                                      | `info \| success \| warning \| destructive \| default`                                | `default`       |
| `icon`        | define o ícone exibido ao lado do título             | `AiIconType` [**Remix Icon**](https://remixicon.com/)                                 | `""`            |
| `duration`    | tempo em milissegundos que o toast ficará visível    | `number`                                                                              | `3000`          |
| `position`    | posição da tela onde o toast será exibido            | `top-left \| top-center \| top-right \| bottom-left \| bottom-center \| bottom-right` | `bottom-center` |

---

[AiToastConfig] - Interface

```typescript
export interface AiToastConfig {
    id: number;
    message: string | unknown;
    description?: string;
    type: AiToastType;
    icon?: AiIconType;
    duration?: number;
    position?: AiToastPosition;
}
```
