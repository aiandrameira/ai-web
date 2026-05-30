import { Component } from "@angular/core";

import { AiButton } from "../../button";
import { AiCard } from "../card";

@Component({
    imports: [AiCard, AiButton],
    template: `
        <ai-card title="Componente Card" variant="default" description="Um card padrão com borda cinza e layout organizado" icon="function">
            <div class="flex flex-col gap-y-4 my-4">
                <p class="text-sm text-muted-foreground">Este é o conteúdo do card. Você pode adicionar qualquer elemento aqui.</p>
                <ai-button variant="outline" size="sm" icon="arrow-left-up">acessar</ai-button>
            </div>
        </ai-card>
    `,
})
export class DemoCardDefaultComponent {}
