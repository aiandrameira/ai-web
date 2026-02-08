import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Header } from "@views/shared";

@Component({
    imports: [RouterModule, Header],
    selector: "app-root",
    template: `
        <ai-header />
        <router-outlet />
    `,
})
export class App {}
