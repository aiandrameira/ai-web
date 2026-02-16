import { ClassValue } from "clsx";

import { NgTemplateOutlet } from "@angular/common";
import {
    AfterContentInit,
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChildren,
    effect,
    ElementRef,
    inject,
    Injector,
    input,
    model,
    OnDestroy,
    output,
    runInInjectionContext,
    TemplateRef,
    viewChild,
    ViewContainerRef,
} from "@angular/core";
import { FormValueControl } from "@angular/forms/signals";

import { mergeClasses } from "../../../core";
import { AiBadge } from "../../badge";
import { AiIcon } from "../../icon/icon.component";
import { AiSelectItem } from "./select-item";
import { AiSelectFacade } from "./select.facade";
import { selectContentVariants, SelectSizeVariants, selectTriggerVariants, selectVariants } from "./select.variants";
import { AiSelectDomService, AiSelectKeyboardContext, AiSelectKeyboardService, AiSelectLabelsService, AiSelectOverlayService, AiSelectStore } from "./services";

const COMPACT_MODE_WIDTH_THRESHOLD = 100;

@Component({
    selector: "ai-select",
    exportAs: "aiSelect",
    imports: [AiBadge, NgTemplateOutlet, AiIcon],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./select.html",
    providers: [AiSelectStore, AiSelectOverlayService, AiSelectKeyboardService, AiSelectFacade, AiSelectDomService, AiSelectLabelsService],
    host: {
        "[attr.data-active]": 'isFocus() ? "" : null',
        "[attr.data-disabled]": 'disabled() ? "" : null',
        "[attr.data-state]": 'isOpen() ? "open" : "closed"',
        "[class]": "classes()",
        "(keydown.{enter,space,arrowdown,arrowup,escape}.prevent)": "onTriggerKeydown($event)",
    },
})
export class AiSelect<T> implements FormValueControl<T | T[]>, AfterContentInit, OnDestroy {
    #elementRef = inject(ElementRef<HTMLElement>);
    #injector = inject(Injector);
    #viewContainerRef = inject(ViewContainerRef);
    #store = inject(AiSelectStore);
    #facade = inject(AiSelectFacade);
    #dom = inject(AiSelectDomService);
    #labels = inject(AiSelectLabelsService);

    readonly maxLabelCount = input<number>(1);
    readonly multiple = input<boolean>(false);

    readonly value = model<T | T[]>("" as unknown as T | T[]);
    readonly disabled = input<boolean>(false);
    readonly invalid = input<boolean>(false);
    readonly readonly = input<boolean>(false);
    readonly required = input<boolean>(false);
    readonly label = input<string>("");
    readonly placeholder = input<string>("Selecione...");
    readonly id = input<string>("");
    readonly touched = model<boolean>(false);

    readonly dropdownTemplate = viewChild.required<TemplateRef<void>>("dropdownTemplate");
    readonly selectItems = contentChildren(AiSelectItem);

    readonly class = input<ClassValue>("");

    readonly size = input<SelectSizeVariants>("default");
    readonly selectedValue = model<T | T[]>(this.multiple() ? [] : ("" as unknown as T));

    readonly selectionChange = output<T | T[]>();

    readonly isOpen = this.#store.isOpen;
    readonly focusedIndex = this.#store.focusedIndex;
    protected readonly isFocus = this.#store.isFocus;
    protected readonly isCompact = this.#store.isCompact;

    protected onFocus = computed(() => {
        if (this.isCompact()) {
            this.isFocus.set(true);
        }
    });

    readonly selectedLabels = computed<string[]>(() => {
        return this.#labels.getLabels({
            value: this.value(),
            multiple: this.multiple(),
            maxLabelCount: this.maxLabelCount(),
            manualLabel: this.label(),
            items: this.selectItems(),
        });
    });

    protected readonly classes = computed(() => mergeClasses(selectVariants(), this.class()));
    protected readonly contentClasses = computed(() => mergeClasses(selectContentVariants()));
    protected readonly triggerClasses = computed(() => mergeClasses(selectTriggerVariants({ size: this.size() })));

    constructor() {
        effect(() => {
            this.writeValue(this.value());
        });
    }

    ngAfterContentInit() {
        const hostWidth = this.#elementRef.nativeElement.offsetWidth || 0;
        let i = 0;
        for (const item of this.selectItems()) {
            item.setSelectHost({
                selectedValue: () => (this.multiple() ? (this.value() as T[]) : [this.value() as T]),
                selectItem: (value: T, label: string) => this.selectItem(value, label),
                navigateTo: () => this._navigateTo(item, i),
            });
            item.size.set(this.size());
            i++;

            if (hostWidth <= COMPACT_MODE_WIDTH_THRESHOLD) {
                this.isCompact.set(true);
                item.mode.set("compact");
            }
        }
    }

    writeValue(value: T | T[]) {
        if (this.multiple() && Array.isArray(value)) {
            this.selectedValue.set(value);
        } else {
            this.selectedValue.set(value ?? ("" as unknown as T));
        }
    }

    onChange(value: T | T[]) {
        this.value.set(value);
    }

    onTouched() {
        this.touched.set(true);
    }

    ngOnDestroy() {
        this._destroyOverlay();
    }

    onTriggerKeydown(event: Event) {
        const { key } = event as KeyboardEvent;

        switch (key) {
            case "Enter":
            case " ":
            case "ArrowDown":
            case "ArrowUp":
                if (!this.isOpen()) {
                    this._open();
                }
                break;
            case "Escape":
                if (this.isOpen()) {
                    this._close();
                }
                break;
        }
    }

    toggle() {
        if (this.disabled()) return;
        return this.isOpen() ? this._close() : this._open();
    }

    selectItem(value: T, label: string) {
        if (value === undefined || value === null || value === "") {
            console.warn("Attempted to select item with invalid value:", { value, label });
            return;
        }

        this.value.update(selectedValues => {
            if (Array.isArray(selectedValues)) {
                return selectedValues.includes(value) ? selectedValues.filter(v => v !== value) : [...selectedValues, value];
            }
            return value;
        });

        const updatedValue = this.value() as T | T[];
        this.onChange(updatedValue);
        this.selectionChange.emit(updatedValue);

        if (this.multiple()) {
            this._updateOverlayPosition();
        } else {
            this._close();
            setTimeout(() => this._focusButton(), 0);
        }
    }

    private _navigateTo(_: AiSelectItem, index: number) {
        this.focusedIndex.set(index);
        this._updateItemFocus(this._getSelectItems(true), index);
    }

    private _updateOverlayPosition(): void {
        setTimeout(() => this.#facade.updateOverlayPosition(), 0);
    }

    private _open() {
        if (this.isOpen()) return;

        const width = this.#elementRef.nativeElement.offsetWidth || 0;

        this.#facade.open({
            elementRef: this.#elementRef,
            viewContainerRef: this.#viewContainerRef,
            dropdownTemplate: this.dropdownTemplate(),
            width,
            keyboardContext: () => this._buildKeyboardContext(),
            onOutsideClick: () => {
                this.isFocus.set(false);
                this._close();
            },
            onAfterOpen: () => {
                this._updateFocusWhenNormalMode();
                this._determinePortalWidthOnOpen(width);
            },
        });
    }

    private _setFocusOnOpen(): void {
        this._focusDropdown();
        this._focusSelectedItem();
    }

    private _close() {
        this.#facade.close(() => {
            this.onTouched();
            this._updateFocusWhenNormalMode();
        });
    }

    private _updateFocusWhenNormalMode(): void {
        if (!this.isCompact()) {
            this.isFocus.set(!this.isOpen());
        }
    }

    private _determinePortalWidthOnOpen(portalWidth: number): void {
        runInInjectionContext(this.#injector, () => {
            afterNextRender(() => {
                if (!this.#facade.hasAttached()) {
                    return;
                }

                const overlayPaneElement = this.#facade.getOverlayElement();
                if (!overlayPaneElement) return;
                const textElements = Array.from(overlayPaneElement.querySelectorAll<HTMLElement>("ai-select-item > span.truncate, [ai-select-item] > span.truncate"));
                let isOverflow = false;
                for (const textElement of textElements) {
                    if (textElement.scrollWidth > textElement.clientWidth + 1) {
                        isOverflow = true;
                        break;
                    }
                }

                if (!isOverflow) {
                    this._setFocusOnOpen();
                    return;
                }

                const selectItems = this.selectItems();
                let itemMaxWidth = 0;
                for (const item of selectItems) {
                    itemMaxWidth = Math.max(itemMaxWidth, item.elementRef.nativeElement.scrollWidth);
                }

                const [selectItem] = selectItems;
                if (isOverflow && selectItem) {
                    const elementStyles = getComputedStyle(selectItem.elementRef.nativeElement);
                    const leftPadding = Number.parseFloat(elementStyles.getPropertyValue("padding-left")) || 0;
                    const rightPadding = Number.parseFloat(elementStyles.getPropertyValue("padding-right")) || 0;
                    itemMaxWidth += leftPadding + rightPadding;
                }

                itemMaxWidth = Math.max(itemMaxWidth, portalWidth);
                this.#facade.updateOverlaySize(itemMaxWidth);
                this.#facade.updateOverlayPosition();

                this._setFocusOnOpen();
            });
        });
    }

    private _destroyOverlay() {
        this.#facade.destroy();
    }

    private _getSelectItems(ignoreFilter = false): HTMLElement[] {
        if (!this.#facade.hasAttached()) return [];

        return this.#dom.getSelectItems(this.#facade.getOverlayElement(), ignoreFilter);
    }

    private _buildKeyboardContext(): AiSelectKeyboardContext {
        const items = this._getSelectItems();

        return {
            items,
            focusedIndex: this.focusedIndex(),
            onNavigate: index => {
                this.focusedIndex.set(index);
                this._updateItemFocus(items, index);
            },
            onSelect: index => {
                const item = items[index];
                if (!item) return;

                const value = item.getAttribute("value");
                const label = item.textContent?.trim() ?? "";

                if (value === null || value === undefined) {
                    console.warn("No value attribute found on selected item:", item);
                    return;
                }

                this.selectItem(value as T, label);
            },
            onClose: () => this._close(),
            onFocusFirst: () => this._focusFirstItem(items),
            onFocusLast: () => this._focusLastItem(items),
            onFocusButton: () => this._focusButton(),
        };
    }

    private _focusFirstItem(items: HTMLElement[]) {
        if (items.length > 0) {
            this.focusedIndex.set(0);
            this._updateItemFocus(items, 0);
        }
    }

    private _focusLastItem(items: HTMLElement[]) {
        if (items.length > 0) {
            const lastIndex = items.length - 1;
            this.focusedIndex.set(lastIndex);
            this._updateItemFocus(items, lastIndex);
        }
    }

    private _updateItemFocus(items: HTMLElement[], focusedIndex: number) {
        this.#dom.updateItemFocus(items, focusedIndex);
    }

    private _focusDropdown() {
        if (!this.#facade.hasAttached()) return;
        this.#dom.focusDropdown(this.#facade.getOverlayElement());
    }

    private _focusButton() {
        this.#dom.focusButton(this.#elementRef);
    }

    private _focusSelectedItem() {
        const items = this._getSelectItems();
        if (items.length === 0) return;

        let selectedValue;
        const value = this.value();
        if (Array.isArray(value) && value.length) {
            [selectedValue] = value;
        } else {
            selectedValue = value;
        }

        let selectedIndex = items.findIndex(item => item.getAttribute("value") === selectedValue);

        if (selectedIndex === -1) {
            selectedIndex = 0;
        }

        this.focusedIndex.set(selectedIndex);
        this._updateItemFocus(items, selectedIndex);
    }
}
