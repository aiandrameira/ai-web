import { ChangeDetectionStrategy, Component, computed, ElementRef, forwardRef, inject, input, output, signal, viewChild, ViewEncapsulation } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { ClassValue } from "clsx";
import { ChangeFn, mergeClasses, noopFn, TouchFn } from "../../core";
import { AiIcon } from "../icon/icon.component";
import { AiCommand } from "./command";
import { commandInputVariants } from "./command.variants";

@Component({
    selector: "ai-command-input",
    exportAs: "aiCommandInput",
    imports: [AiIcon, FormsModule],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="flex items-center border-b border-border px-3" cmdk-input-wrapper="">
            <ai-icon icon="search" class="mr-2 shrink-0 opacity-50" />
            <input
                #searchInput
                [class]="classes()"
                [placeholder]="placeholder()"
                [value]="searchTerm()"
                [disabled]="disabled()"
                (input)="onInput($event)"
                (keydown)="onKeyDown($event)"
                (blur)="onTouched()"
                aria-controls="command-list"
                aria-describedby="command-instructions"
                aria-haspopup="listbox"
                aria-label="Search commands"
                autocomplete="off"
                autocorrect="off"
                spellcheck="false"
                role="combobox"
                [attr.aria-expanded]="true"
            />
        </div>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AiCommandInput),
            multi: true,
        },
    ],
})
export class AiCommandInput implements ControlValueAccessor {
    #cmdComponent = inject(AiCommand, { optional: true });
    readonly searchInput = viewChild.required<ElementRef<HTMLInputElement>>("searchInput");

    readonly placeholder = input<string>("Type a command or search...");
    readonly class = input<ClassValue>("");

    readonly searchTerm = signal<string>("");
    readonly changeValue = output<string>();
    readonly disabled = signal<boolean>(false);

    protected _change: ChangeFn<string> = () => noopFn;
    protected _touched: TouchFn = () => noopFn;

    protected readonly classes = computed(() => mergeClasses(commandInputVariants(), this.class()));

    onInput(event: Event) {
        const target = event.target as HTMLInputElement;
        const { value } = target;
        this.searchTerm.set(value);
        this._updateParentComponents(value);
    }

    onKeyDown(event: KeyboardEvent) {
        if (["ArrowDown", "ArrowUp", "Enter", "Escape"].includes(event.key)) {
            if (event.key !== "Escape") {
                event.preventDefault();
                event.stopPropagation();
            }

            if (this.#cmdComponent) this.#cmdComponent.onKeyDown(event);
        }
    }

    onTouched() {
        this._touched();
    }

    focus() {
        this.searchInput().nativeElement.focus();
    }

    writeValue(value: string | null) {
        const normalizedValue = value ?? "";
        this.searchTerm.set(normalizedValue);
        if (this.#cmdComponent) {
            this.#cmdComponent.onSearch(normalizedValue);
        }
    }

    registerOnChange(fn: (value: string) => void): void {
        this._change = fn;
    }

    registerOnTouched(fn: () => void): void {
        this._touched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled.set(isDisabled);
    }

    private _updateParentComponents(value: string) {
        if (this.#cmdComponent) {
            this.#cmdComponent.onSearch(value);
        }
        this._change(value);
        this.changeValue.emit(value);
    }
}
