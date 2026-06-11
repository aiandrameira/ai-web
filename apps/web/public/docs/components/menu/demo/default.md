```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";

import { AiButton } from "../../button";
import { AiSeparator } from "../../separator";
import { AiMenuImports } from "../menu.imports";

@Component({
    selector: "ai-demo-menu-default",
    imports: [AiButton, AiMenuImports, AiSeparator],
    template: `
        <div class="flex items-center justify-center">
            <button ai-button variant="ghost" ai-menu [menu]="menu">Abrir menu</button>

            <ai-menu-content #menu="aiMenuContent">
                <ai-menu-label>Conta</ai-menu-label>

                <ai-menu-item>
                    Billing
                    <ai-menu-shortcut>⌘B</ai-menu-shortcut>
                </ai-menu-item>
                <ai-separator />
                <ai-menu-item>
                    Keyboard shortcuts
                    <ai-menu-shortcut>⌘K</ai-menu-shortcut>
                </ai-menu-item>
                <ai-menu-item>
                    Settings
                    <ai-menu-shortcut>⌘S</ai-menu-shortcut>
                </ai-menu-item>
                <ai-separator />
                <ai-menu-item>Team</ai-menu-item>
                <ai-menu-item>
                    New Team
                    <ai-menu-shortcut>⌘T</ai-menu-shortcut>
                </ai-menu-item>
            </ai-menu-content>
        </div>
    `,
})
export class DemoMenuDefaultComponent {}
```
