import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from "@angular/core";
import type { ClassValue } from "clsx";
import { AiEmpty } from "../empty";
import { AiIconType } from "../icon/icons";
import { AiCommand } from "./command";

@Component({
    selector: "ai-command-empty",
    exportAs: "aiCommandEmpty",
    imports: [AiEmpty],
    template: `
        @if (shouldShow()) {
        <div [class]="class()">
            <ai-empty [icon]="icon()" [title]="title()" [description]="description()">
                <ng-content />
            </ai-empty>
        </div>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class AiCommandEmpty {
    readonly #cmdComponent = inject(AiCommand, { optional: true });

    readonly icon = input<AiIconType>("menu-search");
    readonly title = input<string>("Nenhum item encontrado");
    readonly description = input<string>("Tente ajustar sua consulta de pesquisa ou verifique a ortografia.");
    readonly class = input<ClassValue>("");

    protected readonly shouldShow = computed(() => (this.#cmdComponent ? this.#cmdComponent.filteredItems().length === 0 : false));
}
