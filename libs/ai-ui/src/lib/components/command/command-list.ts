import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from "@angular/core";

import { mergeClasses } from "../../core";
import { commandListVariants } from "./command.variants";

import type { ClassValue } from "clsx";
@Component({
    selector: "ai-command-list",
    exportAs: "aiCommandList",
    template: `
        <div [class]="classes()" role="listbox" id="command-list">
            <ng-content />
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class AiCommandList {
    readonly class = input<ClassValue>("");

    protected readonly classes = computed(() => mergeClasses(commandListVariants(), this.class()));
}
