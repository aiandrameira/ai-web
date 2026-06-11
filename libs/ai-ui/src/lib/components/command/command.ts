import { ClassValue } from "clsx";

import { ChangeDetectionStrategy, Component, computed, contentChild, contentChildren, forwardRef, input, output, signal, ViewEncapsulation } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";

import { ChangeFn, mergeClasses, noopFn, TouchFn } from "../../core";
import { AiCommandInput } from "./command-input";
import { AiCommandItem } from "./command-item";
import { AiCommandItemConfig, AiCommandRepository } from "./command.config";
import { CommandSizeVariants, commandVariants } from "./command.variants";

@Component({
    selector: "ai-command",
    exportAs: "aiCommand",
    imports: [FormsModule],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div [class]="classes()">
            <div id="command-instructions" class="sr-only">Use arrow keys to navigate, Enter to select, Escape to clear selection.</div>
            <div id="command-status" class="sr-only" aria-live="polite" aria-atomic="true">
                {{ statusMessage() }}
            </div>
            <ng-content />
        </div>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AiCommand),
            multi: true,
        },
    ],
    host: {
        role: "combobox",
        "aria-haspopup": "listbox",
        "[attr.aria-expanded]": "true",
        "(keydown.{arrowdown,arrowup,enter,escape}.prevent)": "onKeyDown($event)",
    },
})
export class AiCommand implements ControlValueAccessor, AiCommandRepository {
    private readonly cmdInputComponent = contentChild(AiCommandInput);
    private readonly cmdItemComponents = contentChildren(AiCommandItem, { descendants: true });
    readonly #registeredItems = signal<AiCommandItem[]>([]);

    readonly size = input<CommandSizeVariants>("default");
    readonly class = input<ClassValue>("");

    protected _change: ChangeFn<string> = () => noopFn;
    protected _touched: TouchFn = () => noopFn;

    readonly searchTerm = signal<string>("");
    readonly selectedIndex = signal<number>(-1);
    #itemUpdateTrigger = signal<number>(0);

    readonly changeCommand = output<AiCommandItemConfig>();
    readonly selectedCommand = output<AiCommandItemConfig>();

    protected readonly itemComponents = computed(() => (this.cmdItemComponents().length ? this.cmdItemComponents() : this.#registeredItems()));

    protected readonly classes = computed(() => mergeClasses(commandVariants({ size: this.size() }), this.class()));

    readonly filteredItems = computed(() => {
        const searchTerm = this.searchTerm();
        this.#itemUpdateTrigger();

        if (!this.itemComponents()) return [];

        const lowerSearchTerm = searchTerm.toLowerCase().trim();
        if (!lowerSearchTerm) return this.itemComponents();

        return this.itemComponents().filter(item => item.label().toLowerCase().includes(lowerSearchTerm) || (item.command()?.toLowerCase() ?? "").includes(lowerSearchTerm));
    });

    protected readonly statusMessage = computed(() => {
        const searchTerm = this.searchTerm().trim();
        const filteredCount = this.filteredItems().length;

        if (!searchTerm) return searchTerm;
        if (!filteredCount) return `No results found for "${searchTerm}"`;

        return `${filteredCount} result${filteredCount === 1 ? "" : "s"} found for "${searchTerm}"`;
    });

    constructor() {
        this._triggerItemsUpdate();
    }

    register(item: AiCommandItem) {
        this.#registeredItems.update(items => [...items, item]);
    }

    unregister(item: AiCommandItem) {
        this.#registeredItems.update(items => items.filter(i => i !== item));
    }

    writeValue(_value: string | null) {
        // Implementation here
    }

    registerOnChange(fn: (value: string) => void): void {
        this._change = fn;
    }

    registerOnTouched(fn: () => void): void {
        this._touched = fn;
    }

    setDisabledState(_isDisabled: boolean): void {
        // Implementation here
    }

    onSearch(searchTerm: string) {
        this.searchTerm.set(searchTerm);
        this.selectedIndex.set(-1);
        this._updateSelectedItem();
    }

    selectItem(item: AiCommandItem) {
        const commandItem: AiCommandItemConfig = {
            value: item.value(),
            label: item.label(),
            disabled: item.disabled(),
            command: item.command(),
            shortcut: item.shortcut(),
            icon: item.icon(),
        };

        this._change(item.value() as string);
        this.changeCommand.emit(commandItem);
        this.selectedCommand.emit(commandItem);
    }

    onKeyDown(event: Event) {
        const filteredItems = this.filteredItems();
        if (filteredItems.length === 0) return;

        const { key } = event as KeyboardEvent;
        const index = this.selectedIndex();

        switch (key) {
            case "ArrowDown": {
                const nextIndex = index < filteredItems.length - 1 ? index + 1 : 0;
                this.selectedIndex.set(nextIndex);
                this._updateSelectedItem();
                break;
            }

            case "ArrowUp": {
                const prevIndex = index > 0 ? index - 1 : filteredItems.length - 1;
                this.selectedIndex.set(prevIndex);
                this._updateSelectedItem();
                break;
            }

            case "Enter":
                if (index >= 0 && index < filteredItems.length) {
                    const selectedItem = filteredItems[index];
                    if (!selectedItem.disabled()) {
                        this.selectItem(selectedItem);
                    }
                }
                break;

            case "Escape":
                this.selectedIndex.set(-1);
                this._updateSelectedItem();
                break;
        }
    }

    refreshItems() {
        this._triggerItemsUpdate();
    }

    focus() {
        this.cmdInputComponent()?.focus();
    }

    private _updateSelectedItem() {
        const filteredItems = this.filteredItems();
        const index = this.selectedIndex();

        for (const option of filteredItems) {
            option.setSelected(false);
        }

        if (index >= 0 && index < filteredItems.length) {
            const selected = filteredItems[index];
            selected.setSelected(true);
            selected.focus();
        }
    }

    private _triggerItemsUpdate(): void {
        this.#itemUpdateTrigger.update(value => value + 1);
    }
}
