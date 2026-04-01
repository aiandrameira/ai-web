import { ClassValue } from "clsx";

import {
    ChangeDetectionStrategy,
    Component,
    computed,
    DestroyRef,
    ElementRef,
    inject,
    input,
    model,
    OnInit,
    output,
    signal,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
} from "@angular/core";

import { mergeClasses } from "../../core";
import { AiIcon } from "../icon/icon.component";
import { AiDatePickerOverlayService } from "./date-picker-overlay.service";
import { datePickerCalendarVariants, datePickerTriggerVariants } from "./date-picker.variants";
import { buildCalendarMonth, formatDate, getMonthLabel, getWeekdayLabels, parseDate } from "./date-picker.util";

@Component({
    selector: "ai-date-picker",
    exportAs: "aiDatePicker",
    imports: [AiIcon],
    providers: [AiDatePickerOverlayService],
    templateUrl: "./date-picker.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class AiDatePicker implements OnInit {
    readonly #overlay = inject(AiDatePickerOverlayService);
    readonly #destroyRef = inject(DestroyRef);
    readonly #elRef = inject(ElementRef<HTMLElement>);
    readonly #vcr = inject(ViewContainerRef);

    @ViewChild("calendarTemplate", { static: true }) calendarTemplate!: TemplateRef<void>;

    readonly id = input<string>("");
    readonly placeholder = input<string>("Selecione a data");
    readonly format = input<string>("yyyy-MM-dd");
    readonly minDate = input<string>("");
    readonly maxDate = input<string>("");
    readonly disabled = input<boolean>(false);
    readonly class = input<ClassValue>("");

    readonly value = model<string>("");

    readonly valueChange = output<string>();

    protected readonly isOpen = signal(false);
    protected readonly viewYear = signal(new Date().getFullYear());
    protected readonly viewMonth = signal(new Date().getMonth());
    protected readonly weekdays = getWeekdayLabels();

    protected readonly selectedDate = computed(() => parseDate(this.value()));

    protected readonly calendarMonth = computed(() =>
        buildCalendarMonth(
            this.viewYear(),
            this.viewMonth(),
            this.selectedDate(),
            this.minDate() ? parseDate(this.minDate()) ?? undefined : undefined,
            this.maxDate() ? parseDate(this.maxDate()) ?? undefined : undefined,
        ),
    );

    protected readonly monthLabel = computed(() => `${getMonthLabel(this.viewMonth())} ${this.viewYear()}`);

    protected readonly displayValue = computed(() => {
        const date = this.selectedDate();
        return date ? formatDate(date, this.format()) : "";
    });

    protected readonly triggerClasses = computed(() => mergeClasses(datePickerTriggerVariants({ disabled: this.disabled() }), this.class()));

    protected readonly calendarClasses = computed(() => mergeClasses(datePickerCalendarVariants()));

    ngOnInit() {
        this.#overlay.create(this.#elRef);
        this.#destroyRef.onDestroy(() => this.#overlay.destroy());
    }

    protected toggle() {
        if (this.disabled()) return;
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
    }

    protected open() {
        if (this.isOpen()) return;
        const date = this.selectedDate();
        if (date) {
            this.viewYear.set(date.getFullYear());
            this.viewMonth.set(date.getMonth());
        }
        this.#overlay.attach(this.calendarTemplate, this.#vcr);
        this.isOpen.set(true);

        this.#overlay.outsidePointerEvents().subscribe(event => {
            const target = event.target as HTMLElement;
            if (!this.#elRef.nativeElement.contains(target)) {
                this.close();
            }
        });
    }

    protected close() {
        this.#overlay.detach();
        this.isOpen.set(false);
    }

    protected selectDay(date: Date) {
        const formatted = formatDate(date, "yyyy-MM-dd");
        this.value.set(formatted);
        this.valueChange.emit(formatted);
        this.close();
    }

    protected prevMonth() {
        const m = this.viewMonth();
        if (m === 0) {
            this.viewMonth.set(11);
            this.viewYear.update(y => y - 1);
        } else {
            this.viewMonth.set(m - 1);
        }
    }

    protected nextMonth() {
        const m = this.viewMonth();
        if (m === 11) {
            this.viewMonth.set(0);
            this.viewYear.update(y => y + 1);
        } else {
            this.viewMonth.set(m + 1);
        }
    }

    protected prevYear() {
        this.viewYear.update(y => y - 1);
    }

    protected nextYear() {
        this.viewYear.update(y => y + 1);
    }
}
