import { ClassValue } from "class-variance-authority/types";

import { ChangeDetectionStrategy, Component, computed, input, signal, ViewEncapsulation } from "@angular/core";

import { mergeClasses } from "../../core";
import { AiIcon } from "../icon/icon.component";
import { AiBreadcrumbConfig } from "./breadcrumb.config";

@Component({
    selector: "ai-breadcrumb-ellipsis",
    exportAs: "aiBreadcrumbEllipsis",
    imports: [AiIcon],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <li class="relative flex items-center">
            <button type="button" [class]="classes()" (click)="toggle()" aria-label="Show more breadcrumbs">
                <ai-icon icon="more" size="sm" />
            </button>

            @if (open()) {
                <div
                    class="absolute top-full left-1/2 -translate-x-1/2 mt-1 z-50 min-w-32 rounded-md border border-border bg-background shadow-md py-1 animate-in fade-in-0 zoom-in-95"
                >
                    @for (item of hiddenItems(); track item.path) {
                        <a
                            [href]="item.path"
                            class="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            (click)="open.set(false)"
                        >
                            @if (item.icon) {
                                <ai-icon [icon]="item.icon" size="sm" />
                            }
                            {{ item.label }}
                        </a>
                    }
                </div>
            }
        </li>
    `,
})
export class AiBreadcrumbEllipsis {
    readonly hiddenItems = input<AiBreadcrumbConfig[]>([]);
    readonly class = input<ClassValue>("");

    open = signal(false);

    toggle() {
        this.open.update(v => !v);
    }

    protected classes = computed(() =>
        mergeClasses("flex items-center justify-center size-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors", this.class()),
    );
}
