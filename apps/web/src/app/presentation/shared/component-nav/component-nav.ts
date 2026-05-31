import { AiButton, AiIcon } from "@ai-ui/components";
import { Component, computed, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { components } from "@domain/constants";

export interface ComponentNavItem {
    name: string;
    path: string;
}

@Component({
    selector: "ai-component-nav",
    imports: [AiButton, AiIcon, RouterLink],
    templateUrl: "./component-nav.html",
})
export class ComponentNav {
    currentName = input.required<string>();
    mode = input<"header" | "footer" | "both">("both");

    private allComponents = computed(() => components.map(c => ({ name: c.componentName, path: `/component/${c.componentName}` })).sort((a, b) => a.name.localeCompare(b.name)));

    currentIndex = computed(() => this.allComponents().findIndex(c => c.name === this.currentName()));

    prev = computed<ComponentNavItem | null>(() => {
        const idx = this.currentIndex();
        return idx > 0 ? this.allComponents()[idx - 1] : null;
    });

    next = computed<ComponentNavItem | null>(() => {
        const idx = this.currentIndex();
        const all = this.allComponents();
        return idx < all.length - 1 ? all[idx + 1] : null;
    });

    formatName(name: string) {
        return name.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    }
}
