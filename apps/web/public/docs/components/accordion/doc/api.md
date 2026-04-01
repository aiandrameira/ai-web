# API

[AiAccordion] - Component

> O `<ai-accordion>` é o container principal que gerencia um conjunto de painéis expansíveis.

### Propriedades

| Propriedade | Descrição                                                        | Tipo         | Default |
| ----------- | ---------------------------------------------------------------- | ------------ | ------- |
| `multi`     | se verdadeiro, permite múltiplos painéis abertos simultaneamente | `boolean`    | `false` |
| `class`     | classes CSS adicionais                                           | `ClassValue` | `""`    |

---

[AiAccordionItem] - Component

> O `<ai-accordion-item>` é o painel individual com cabeçalho clicável e conteúdo expansível.

### Propriedades

| Propriedade   | Descrição                                 | Tipo         | Default     |
| ------------- | ----------------------------------------- | ------------ | ----------- |
| `title`       | título exibido no cabeçalho (obrigatório) | `string`     | -           |
| `description` | descrição opcional exibida no cabeçalho   | `string`     | `""`        |
| `icon`        | ícone exibido ao lado do título           | `AiIconType` | `undefined` |
| `expanded`    | estado inicial de expansão do painel      | `boolean`    | `false`     |
| `disabled`    | desabilita a interação com o painel       | `boolean`    | `false`     |
| `hideToggle`  | oculta o indicador de expansão            | `boolean`    | `false`     |

### Eventos

| Evento   | Descrição                           | Tipo   |
| -------- | ----------------------------------- | ------ |
| `opened` | emitido quando o painel é expandido | `void` |
| `closed` | emitido quando o painel é colapsado | `void` |

### Métodos

| Método     | Descrição                           | Parâmetros |
| ---------- | ----------------------------------- | ---------- |
| `toggle()` | alterna entre expandido e colapsado | -          |
