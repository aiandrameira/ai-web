```angular-ts title="header.component.ts" copyButton
import { AiButton } from "@ai-ui/components";
import { ThemeStore } from "@ai-ui/infra";
import { Component, inject, signal } from "@angular/core";

@Component({
    selector: "ai-header",
    imports: [AiButton],
    templateUrl: "./header.html",
})
export class HeaderComponent {
    #themeStore = inject(ThemeStore);

    protected theme = this.#themeStore.theme;

    onChangeTheme() {
        const currentTheme = this.#themeStore.theme();
        this.#themeStore.changeTo(currentTheme === "light" ? "dark" : "light");
    }
}
```

```html title="header.component.html" copyButton
<ai-button [icon]="theme() === 'dark' ? 'sun' : 'moon'" (click)="onChangeTheme()" size="xs" variant="ghost" />
```
