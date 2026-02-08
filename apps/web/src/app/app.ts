import { AiToast } from "@ai-ui/components";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Header } from "@views/shared";

@Component({
    imports: [RouterModule, Header, AiToast],
    selector: "app-root",
    template: `
        <ai-header />
        <router-outlet />
        <ai-toast />
    `,
})
export class App {}
