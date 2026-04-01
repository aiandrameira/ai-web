# API

[AiAutocomplete] - Component

> O `[ai-autocomplete]` é um campo de formulário que oferece sugestões enquanto o usuário digita. Ele pode ser usado para busca de dados locais, facilitando a seleção de opções.

### Propriedades

| Property   | Description                                         | Type                               | Default |
| ---------- | --------------------------------------------------- | ---------------------------------- | ------- |
| `label`    | define o rótulo                                     | `string`                           | `""`    |
| `id`       | define o id                                         | `string`                           | `""`    |
| `placeholder` | define o placeholder                             | `string`                           | `""`    |
| `disabled` | desabilita o campo                                  | `boolean`                          | `false` |
| `readonly` | define o campo como somente leitura                 | `boolean`                          | `false` |
| `[(value)]` | define o valor selecionado                         | `Key \| null`                      | `null`  |
| `config`   | configuração do autocomplete (dados, filtros, etc.) | `AiAutocompleteConfig<T, Key>`     | `null`  |
| `class`    | classes CSS adicionais                              | `ClassValue`                       | `""`    |

### Eventos

| Event            | Description                                              | Type                   |
| ---------------- | -------------------------------------------------------- | ---------------------- |
| `changeSelected` | emite o objeto completo quando um item é selecionado     | `OutputEmitter<T>`     |
| `changeValue`    | emite apenas o valor da propriedade `useValue`           | `OutputEmitter<Key \| null>` |

---

[AiAutocompleteConfig] - Class Config

> Classe usada para configurar o `ai-autocomplete` com um array de dados local.

| Property       | Description                                                          | Type                    |
| -------------- | -------------------------------------------------------------------- | ----------------------- |
| `data`         | array de dados utilizado para a busca                                | `T[]`                   |
| `keyword`      | campo(s) usado(s) para filtrar a busca (aceita múltiplos)            | `keyof T \| (keyof T)[]` |
| `useLabel`     | propriedade usada como rótulo padrão                                 | `keyof T`               |
| `useValue`     | propriedade usada como valor do formulário                           | `keyof T`               |
| `displayLabel` | customiza o rótulo exibido no input e na lista dropdown              | `(item: T) => string`  |

### Exemplo de uso

```ts
const config = new AiAutocompleteConfig<User, number>({
    data: users,
    keyword: ["name", "email"],
    useLabel: "name",
    useValue: "id",
    displayLabel: (item) => `${item.id} - ${item.name}`,
});
```
