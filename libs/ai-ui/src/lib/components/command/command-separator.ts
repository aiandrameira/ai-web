import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from "@angular/core";
import { ClassValue } from "clsx";
import { mergeClasses } from "../../core";
import { AiCommand } from "./command";
import { commandSeparatorVariants } from "./command.variants";

@Component({
    selector: "ai-command-separator",
    exportAs: "aiCommandSeparator",
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        @if (shouldShow()) {
            <div [class]="classes()" role="separator"></div>
        }
    `,
})
export class AiCommandSeparator {
    #cmdComponent = inject(AiCommand, { optional: true });

    readonly class = input<ClassValue>("");

    protected readonly classes = computed(() => mergeClasses(commandSeparatorVariants(), this.class()));

    protected readonly shouldShow = computed(() => {
        if (!this.#cmdComponent) return;

        const searchTerm = this.#cmdComponent.searchTerm();

        if (searchTerm === "") return true;
        return false;
    });
}
