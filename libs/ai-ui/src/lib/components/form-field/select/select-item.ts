import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, linkedSignal, signal } from "@angular/core";

import { mergeClasses, noopFn, transform } from "../../../core";
import { AiIcon } from "../../icon/icon.component";
import { selectItemIconVariants, SelectItemModeVariants, selectItemVariants, SelectSizeVariants } from "./select.variants";

interface SelectHost<T = unknown> {
    selectedValue(): T[];
    selectItem(value: T, label: string): void;
    navigateTo(): void;
}

@Component({
    selector: "ai-select-item, [ai-select-item]",
    imports: [AiIcon],
    template: `
        @if (isSelected()) {
            <span [class]="iconClasses()">
                <ai-icon icon="check-double" size="default" />
            </span>
        }
        <span class="truncate flex-1">
            <ng-content />
        </span>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        role: "option",
        tabindex: "-1",
        "[class]": "classes()",
        "[attr.value]": "value()",
        "[attr.data-disabled]": 'disabled() ? "" : null',
        "[attr.data-selected]": 'isSelected() ? "" : null',
        "[attr.aria-selected]": "isSelected()",
        "(click)": "onClick()",
        "(mouseenter)": "onMouseEnter()",
        "(keydown.{tab}.prevent)": "noopFn",
    },
})
export class AiSelectItem<T = unknown> {
    readonly elementRef = inject(ElementRef<HTMLElement>);

    readonly value = input.required<T>();
    readonly disabled = input(false, { transform });
    readonly class = input<string>("");

    private readonly select = signal<SelectHost | null>(null);
    noopFn = noopFn;

    readonly label = linkedSignal<string>(() => {
        const element = this.elementRef.nativeElement;
        return (element.textContent ?? element.innerText)?.trim() ?? "";
    });

    readonly mode = signal<SelectItemModeVariants>("normal");
    readonly size = signal<SelectSizeVariants>("default");

    protected readonly classes = computed(() => mergeClasses(selectItemVariants({ mode: this.mode(), size: this.size() }), this.class()));
    protected readonly iconClasses = computed(() => mergeClasses(selectItemIconVariants({ mode: this.mode(), size: this.size() })));
    protected readonly strokeWidth = computed(() => (this.mode() === "compact" ? 3 : 2));
    protected readonly isSelected = computed(() => this.select()?.selectedValue().includes(this.value()) ?? false);

    setSelectHost(selectHost: SelectHost) {
        this.select.set(selectHost);
    }

    onMouseEnter() {
        if (this.disabled()) return;
        this.select()?.navigateTo();
    }

    onClick() {
        if (this.disabled()) return;
        this.select()?.selectItem(this.value(), this.label());
    }
}
