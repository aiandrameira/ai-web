import { effect, Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class ThemeStore {
    #theme = signal<"light" | "dark">("light");
    theme = this.#theme.asReadonly();

    constructor () {
        effect(() => this._handleTheme(this.theme()));
        this.load();
    }

    onChange (_: MouseEvent) {
        this.changeTo(this.theme() === "light" ? "dark" : "light");
    }

    load () {
        if (!localStorage.getItem("theme")) return;

        const themeConfig: "light" | "dark" = localStorage.getItem("theme") as "light" | "dark";
        this.#theme.set(themeConfig);
    }

    changeTo (theme: "light" | "dark") {
        localStorage.setItem("theme", theme);
        this.#theme.set(theme);
    }

    private _handleTheme (theme: string) {
        if (theme === "light") {
            document.documentElement.classList.remove("dark");
            return;
        }
        document.documentElement.classList.add("dark");
    }
}