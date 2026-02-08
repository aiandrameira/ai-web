import { AiBadge, AiButton } from "@ai-ui/components";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { sidenavPaths } from "@domain/constants";

import { Header } from "../header/header";
import { MobileMenu } from "../mobile-menu/mobile-menu";

@Component({
    selector: "ai-sidenav",
    imports: [RouterModule, Header, AiButton, AiBadge, MobileMenu],
    templateUrl: "./sidenav.html",
})
export class Sidenav {
    sidenavPaths = sidenavPaths;
}
