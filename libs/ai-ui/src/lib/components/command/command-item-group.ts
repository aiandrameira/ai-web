import { ChangeDetectionStrategy, Component, computed, contentChildren, inject, input, signal, ViewEncapsulation } from "@angular/core";
import { ClassValue } from "clsx";
import { mergeClasses } from "../../core";
import { AiCommand } from "./command";
import { AiCommandItem } from "./command-item";
import { commandGroupHeadingVariants, commandGroupVariants } from "./command.variants";

export abstract class AiCommandItemGroupRepository {
    abstract register(item: AiCommandItem): void;
    abstract unregister(item: AiCommandItem): void;
}

@Component({
    selector: "ai-command-item-group",
    exportAs: "aiCommandItemGroup",
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        @if (visibledGroup()) {
        <div [class]="classes()" role="group">
            @if (label()) {
            <div [class]="headingClasses()" role="presentation">
                {{ label() }}
            </div>
            }
            <div role="group">
                <ng-content />
            </div>
        </div>
        }
    `,
})
export class AiCommandItemGroup implements AiCommandItemGroupRepository {
    readonly #cmdComponent = inject(AiCommand, { optional: true });
    private readonly cmdItemComponents = contentChildren(AiCommandItem, { descendants: true });
    readonly #registeredComponents = signal<AiCommandItem[]>([]);

    readonly label = input.required<string>();
    readonly class = input<ClassValue>("");

    protected readonly classes = computed(() => mergeClasses(commandGroupVariants({}), this.class()));
    protected readonly headingClasses = computed(() => mergeClasses(commandGroupHeadingVariants({})));
    readonly #itemComponents = computed(() => (this.cmdItemComponents().length ? this.cmdItemComponents() : this.#registeredComponents()));

    protected readonly visibledGroup = computed(() => {
        if (!this.#cmdComponent || !this.#itemComponents().length) return true;

        const searchTerm = this.#cmdComponent.searchTerm();
        if (!searchTerm) return true;

        const filteredItems = this.#cmdComponent.filteredItems();
        return this.#itemComponents().some(item => filteredItems.includes(item));
    });

    register(item: AiCommandItem) {
        this.#registeredComponents.update(items => [...items, item]);
    }

    unregister(item: AiCommandItem) {
        this.#registeredComponents.update(items => items.filter(i => i !== item));
    }
}
