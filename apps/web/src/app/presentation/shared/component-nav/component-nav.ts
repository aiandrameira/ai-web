import { AiButton, AiIcon } from "@ai-ui/components";
import { Component, computed, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { dataComponents, formComponents } from "@domain/constants";

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

    private groupList = computed(() => {
        const name = this.currentName();
        const isForm = formComponents.some(c => c.componentName === name);
        const list = isForm ? formComponents : dataComponents;
        return list.map(c => ({ name: c.componentName, path: `/component/${c.componentName}` })).sort((a, b) => a.name.localeCompare(b.name));
    });

    currentIndex = computed(() => this.groupList().findIndex(c => c.name === this.currentName()));

    prev = computed<ComponentNavItem | null>(() => {
        const idx = this.currentIndex();
        return idx > 0 ? this.groupList()[idx - 1] : null;
    });

    next = computed<ComponentNavItem | null>(() => {
        const idx = this.currentIndex();
        const list = this.groupList();
        return idx < list.length - 1 ? list[idx + 1] : null;
    });

    formatName(name: string) {
        return name.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    }
}
