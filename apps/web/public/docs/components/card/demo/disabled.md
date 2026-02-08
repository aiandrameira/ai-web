```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";
import { AiCard } from "../card";

@Component({
    imports: [AiCard],
    template: `
        <ai-card title="Componente Card" disabled description="Um card padrão com borda cinza e layout organizado" icon="function">
            <p class="text-sm text-muted-foreground">Este é o conteúdo do card. Você pode adicionar qualquer elemento aqui.</p>
        </ai-card>
    `,
})
export class DemoCardDisabledComponent {}
```
