import { ClassValue } from "clsx";
import { Subscription } from "rxjs";

import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    ElementRef,
    inject,
    input,
    linkedSignal,
    model,
    OnDestroy,
    output,
    signal,
    TemplateRef,
    viewChild,
    ViewContainerRef,
    ViewEncapsulation,
} from "@angular/core";
import { FormValueControl } from "@angular/forms/signals";

import { mergeClasses } from "../../../core";
import { AiIcon } from "../../icon/icon.component";
import { AiAutocompleteConfig } from "./autocomplete-config";
import { autocompleteDropdownVariants, autocompleteInputVariants, autocompleteItemVariants, autocompleteLabelVariants } from "./autocomplete.variants";
import { AiAutocompleteOverlayService } from "./services";

import type { ValidationError } from "@angular/forms/signals";

@Component({
    selector: "ai-autocomplete",
    exportAs: "aiAutocomplete",
    imports: [AiIcon],
    providers: [AiAutocompleteOverlayService],
    templateUrl: "./autocomplete.html",
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        "[class]": "classes()",
    },
})
export class AiAutocomplete<T, Key = unknown> implements FormValueControl<Key | null>, OnDestroy {
    #overlayService = inject(AiAutocompleteOverlayService);
    #elementRef = inject(ElementRef<HTMLElement>);
    #viewContainerRef = inject(ViewContainerRef);
    #outsideSub?: Subscription;

    readonly config = input<AiAutocompleteConfig<T, Key> | null>(null);

    readonly id = input<string>("");
    readonly label = input.required<string>();
    readonly placeholder = input<string>("");
    readonly class = input<ClassValue>("");

    readonly value = model<Key | null>(null);
    readonly touched = model<boolean>(false);
    readonly disabled = input<boolean>(false);
    readonly invalid = input<boolean>(false);
    readonly readonly = input<boolean>(false);
    readonly required = input<boolean>(false);
    readonly errors = input<readonly ValidationError.WithOptionalField[]>([]);

    readonly changeSelected = output<T>();
    readonly changeValue = output<Key | null>();

    readonly dropdownTemplate = viewChild.required<TemplateRef<void>>("dropdownTemplate");

    protected readonly isOpen = signal<boolean>(false);
    protected readonly focusedIndex = signal<number>(-1);

    protected readonly searchText = linkedSignal<string>(() => {
        const value = this.value();
        const config = this.config();
        if (value != null && value !== ("" as unknown) && config) {
            const item = config.findByValue(value);
            if (item) return config.getLabel(item);
        }
        return "";
    });

    protected readonly hasValue = computed(() => {
        const value = this.value();
        return value != null && value !== ("" as unknown);
    });

    protected readonly filteredItems = computed(() => {
        const config = this.config();
        if (!config) return [] as T[];

        const searchValue = this.searchText();
        const selectedItem = config.findByValue(this.value());
        const displayLabel = selectedItem ? config.getLabel(selectedItem) : null;

        if (displayLabel && searchValue === displayLabel) {
            return config.data;
        }

        return config.filter(searchValue);
    });

    protected readonly hasError = computed(() => this.touched() && this.invalid());

    protected readonly errorMessages = computed(() => {
        const errors = this.errors();
        if (!errors?.length) return [] as string[];
        return errors.map(e => e.message).filter(Boolean) as string[];
    });

    protected readonly classes = computed(() => mergeClasses("relative inline-block w-full", this.class()));
    protected readonly inputClass = computed(() => mergeClasses(autocompleteInputVariants({ error: this.hasError(), disabled: this.disabled() })));
    protected readonly labelClass = computed(() => mergeClasses(autocompleteLabelVariants({ error: this.hasError(), disabled: this.disabled() })));
    protected readonly dropdownClass = computed(() => mergeClasses(autocompleteDropdownVariants()));

    constructor() {
        effect(() => {
            this.writeValue(this.value());
        });
    }

    writeValue(_: Key | null) {
        // linkedSignal handles searchText synchronization automatically
    }

    onChange(value: Key | null) {
        this.value.set(value);
    }

    onTouched() {
        this.touched.set(true);
    }

    protected onInput(event: Event) {
        const inputValue = (event.target as HTMLInputElement).value;
        this.searchText.set(inputValue);

        if (this.hasValue()) {
            const config = this.config();
            if (config) {
                const selectedItem = config.findByValue(this.value()!);
                const displayLabel = selectedItem ? config.getLabel(selectedItem) : "";
                if (inputValue !== displayLabel) {
                    this.value.set(null);
                    this.changeValue.emit(null);
                }
            }
        }

        this.focusedIndex.set(-1);

        if (!this.isOpen()) {
            this._open();
        }
    }

    protected onFocus() {
        if (!this.isOpen() && !this.disabled() && !this.readonly()) {
            this._open();
        }
    }

    protected onClear(event: Event) {
        event.preventDefault();
        event.stopPropagation();
        this.searchText.set("");
        this.value.set(null);
        this.changeValue.emit(null);
        this.focusedIndex.set(-1);
    }

    protected selectItem(item: T) {
        const config = this.config();
        if (!config) return;

        const value = config.getValue(item);
        this.value.set(value);
        this.searchText.set(config.getLabel(item));
        this.changeSelected.emit(item);
        this.changeValue.emit(value);
        this._close();
    }

    protected onKeydown(event: KeyboardEvent) {
        switch (event.key) {
            case "ArrowDown":
                event.preventDefault();
                if (!this.isOpen()) {
                    this._open();
                } else {
                    this._navigate(1);
                }
                break;
            case "ArrowUp":
                event.preventDefault();
                if (this.isOpen()) {
                    this._navigate(-1);
                }
                break;
            case "Enter":
                if (this.isOpen() && this.focusedIndex() >= 0) {
                    event.preventDefault();
                    const items = this.filteredItems();
                    const focusedItem = items[this.focusedIndex()];
                    if (focusedItem) {
                        this.selectItem(focusedItem);
                    }
                }
                break;
            case "Escape":
                if (this.isOpen()) {
                    event.preventDefault();
                    this._close();
                }
                break;
            case "Tab":
                if (this.isOpen()) {
                    this._close();
                    this.onTouched();
                }
                break;
        }
    }

    protected getDisplayLabel(item: T): string {
        const config = this.config();
        if (!config) return "";
        return config.getLabel(item);
    }

    protected isItemSelected(item: T): boolean {
        const config = this.config();
        if (!config || !this.hasValue()) return false;
        return config.getValue(item) === this.value();
    }

    protected itemClass(index: number): string {
        return mergeClasses(autocompleteItemVariants(), index === this.focusedIndex() ? "bg-default text-default-foreground" : "");
    }

    ngOnDestroy() {
        this.#outsideSub?.unsubscribe();
        this.#overlayService.destroy();
    }

    private _open() {
        if (this.isOpen() || this.disabled() || this.readonly()) return;

        const width = this.#elementRef.nativeElement.offsetWidth || 0;
        this.#overlayService.create(this.#elementRef, width);
        this.#overlayService.attach(this.dropdownTemplate(), this.#viewContainerRef);
        this.isOpen.set(true);

        this.#outsideSub?.unsubscribe();
        this.#outsideSub = this.#overlayService.outsidePointerEvents().subscribe(event => {
            const target = event.target as Node | null;
            if (!target || !this.#elementRef.nativeElement.contains(target)) {
                this._close();
                this.onTouched();
            }
        });
    }

    private _close() {
        this.#outsideSub?.unsubscribe();
        this.#overlayService.detach();
        this.isOpen.set(false);
        this.focusedIndex.set(-1);
    }

    private _navigate(direction: number) {
        const items = this.filteredItems();
        if (items.length === 0) return;
        let next = this.focusedIndex() + direction;
        if (next < 0) next = items.length - 1;
        if (next >= items.length) next = 0;
        this.focusedIndex.set(next);
        this._scrollToFocused();
    }

    private _scrollToFocused() {
        const overlayElement = this.#overlayService.getOverlayElement();
        if (!overlayElement) return;
        const items = overlayElement.querySelectorAll('[role="option"]');
        const focusedItem = items[this.focusedIndex()] as HTMLElement | undefined;
        focusedItem?.scrollIntoView({ block: "nearest" });
    }
}
