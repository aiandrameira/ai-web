```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";

import { AiAccordion, AiAccordionItem } from "../accordion";

@Component({
    imports: [AiAccordion, AiAccordionItem],
    template: `
        <div class="w-full max-w-xl">
            <ai-accordion>
                <ai-accordion-item title="Primeiro" description="Descrição do painel primeiro" icon="exchange">
                    <h2 class="font-semibold">Conteúdo do painel <b>One</b></h2>
                    <p>Este é o conteúdo do primeiro painel do accordion.</p>
                </ai-accordion-item>

                <ai-accordion-item title="Segundo" description="Descrição do painel segundo" icon="file-text">
                    <h2 class="font-semibold">Conteúdo do painel <b>Two</b></h2>
                    <p>Este é o conteúdo do segundo painel do accordion.</p>
                    <ul class="list-disc pl-4 mt-2">
                        <li>Item 1</li>
                        <li>Item 2</li>
                        <li>Item 3</li>
                    </ul>
                </ai-accordion-item>

                <ai-accordion-item title="Terceiro" description="Descrição do painel terceiro" icon="attachment-2">
                    <h2 class="font-semibold">Conteúdo do painel <b>Three</b></h2>
                    <p>Este é o conteúdo do terceiro painel do accordion.</p>
                </ai-accordion-item>
            </ai-accordion>
        </div>
    `,
})
export class DemoAccordionSingleComponent {}
```
