import { AiBadge, AiButton } from "@ai-ui/components";
import { Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { sidenavPaths } from "@domain/constants";
import { MobileMenuService } from "@infra/services";

@Component({
    selector: "ai-mobile-menu",
    imports: [RouterModule, AiBadge, AiButton],
    templateUrl: "./mobile-menu.html",
})
export class MobileMenu {
    #mobileMenuService = inject(MobileMenuService);

    openMenu = this.#mobileMenuService.isOpen;

    sidenavPaths = sidenavPaths;

    open = () => this.#mobileMenuService.open();
    close = () => this.#mobileMenuService.close();
}
