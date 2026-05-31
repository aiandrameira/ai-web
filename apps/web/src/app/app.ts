import { AiLoader, AiLoaderService, AiToast } from "@ai-ui/components";
import { Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Header } from "@views/shared";

@Component({
    imports: [RouterModule, Header, AiToast, AiLoader],
    selector: "app-root",
    template: `
        @if (isLoading()) {
            <ai-loader type="progress" />
        }
        <ai-header />
        <router-outlet />
        <ai-toast />
    `,
})
export class App {
    protected isLoading = inject(AiLoaderService).isLoading;
}
