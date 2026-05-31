import { AiBadge, AiButton, AiSeparator } from "@ai-ui/components";
import { ThemeStore } from "@ai-ui/infra";
import { Component, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { headerPaths } from "@domain/constants";
import { environment } from "@env/environment.development";
import { MobileMenuService } from "@infra/services";

import { InputSearch } from "../input-search/input-search";

@Component({
    selector: "ai-header",
    imports: [AiButton, InputSearch, AiSeparator, AiBadge, RouterLink],
    templateUrl: "./header.html",
})
export class Header {
    #themeStore = inject(ThemeStore);
    #mobileMenuService = inject(MobileMenuService);

    version = environment.version;
    theme = this.#themeStore.theme;
    show = signal<boolean>(false);
    openMenu = this.#mobileMenuService.isOpen;

    protected items = [...headerPaths];

    change() {
        const currentTheme = this.#themeStore.theme();
        this.#themeStore.changeTo(currentTheme === "light" ? "dark" : "light");
    }

    showMenu() {
        this.show.update(current => !current);
    }

    toggleMenu() {
        this.#mobileMenuService.toggle();
    }
}
