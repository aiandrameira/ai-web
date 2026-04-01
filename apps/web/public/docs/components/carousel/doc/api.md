# API

[AiCarousel] - Component

> O `<ai-carousel>` é um componente de slideshow para alternar entre elementos com suporte a arrastar com o mouse, deslizar por toque e reprodução automática.

### Propriedades

| Propriedade        | Descrição                                      | Tipo                       | Default        |
| ------------------ | ---------------------------------------------- | -------------------------- | -------------- |
| `orientation`      | define a orientação do carousel                | `"horizontal" \| "vertical"` | `"horizontal"` |
| `loop`             | habilita navegação infinita                    | `boolean`                  | `false`        |
| `autoplay`         | habilita reprodução automática                 | `boolean`                  | `false`        |
| `autoplayInterval` | intervalo do autoplay em milissegundos         | `number`                   | `4000`         |
| `showDots`         | exibe indicadores de navegação                 | `boolean`                  | `true`         |
| `showNav`          | exibe setas de navegação                       | `boolean`                  | `true`         |
| `class`            | classes CSS adicionais                         | `ClassValue`               | `""`           |

### Eventos

| Evento        | Descrição                                | Tipo            |
| ------------- | ---------------------------------------- | --------------- |
| `slideChange` | emitido quando o slide ativo muda        | `number`        |

### Métodos

| Método       | Descrição                                 | Parâmetros       |
| ------------ | ----------------------------------------- | ---------------- |
| `prev()`     | navega para o slide anterior              | -                |
| `next()`     | navega para o próximo slide               | -                |
| `goTo(index)` | navega para um slide específico          | `index: number`  |

---

[AiCarouselItem] - Component

> O `<ai-carousel-item>` é o wrapper para cada slide dentro do carousel.

### Propriedades

| Propriedade   | Descrição                                      | Tipo           | Default  |
| ------------- | ---------------------------------------------- | -------------- | -------- |
| `class`       | classes CSS adicionais                         | `ClassValue`   | `""`     |
