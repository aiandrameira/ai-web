export interface AiCalendarDay {
    date: Date;
    day: number;
    isCurrentMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    isDisabled: boolean;
}

export interface AiCalendarMonth {
    year: number;
    month: number;
    weeks: AiCalendarDay[][];
}

const WEEKDAY_LABELS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTH_LABELS = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

export function getWeekdayLabels(): string[] {
    return WEEKDAY_LABELS;
}

export function getMonthLabel(month: number): string {
    return MONTH_LABELS[month];
}

export function buildCalendarMonth(year: number, month: number, selectedDate: Date | null, minDate?: Date, maxDate?: Date): AiCalendarMonth {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDay = new Date(year, month, 1);
    const startDay = new Date(firstDay);
    startDay.setDate(startDay.getDate() - startDay.getDay());

    const weeks: AiCalendarDay[][] = [];

    const current = new Date(startDay);
    for (let w = 0; w < 6; w++) {
        const week: AiCalendarDay[] = [];
        for (let d = 0; d < 7; d++) {
            const date = new Date(current);
            date.setHours(0, 0, 0, 0);

            let isDisabled = false;
            if (minDate) {
                const min = new Date(minDate);
                min.setHours(0, 0, 0, 0);
                isDisabled = date < min;
            }
            if (maxDate && !isDisabled) {
                const max = new Date(maxDate);
                max.setHours(0, 0, 0, 0);
                isDisabled = date > max;
            }

            week.push({
                date,
                day: date.getDate(),
                isCurrentMonth: date.getMonth() === month,
                isToday: date.getTime() === today.getTime(),
                isSelected: selectedDate ? date.getTime() === selectedDate.getTime() : false,
                isDisabled,
            });
            current.setDate(current.getDate() + 1);
        }
        weeks.push(week);
    }

    return { year, month, weeks };
}

export function formatDate(date: Date | null, format: string): string {
    if (!date) return "";
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");

    switch (format) {
        case "yyyy-MM-dd":
            return `${y}-${m}-${d}`;
        case "dd/MM/yyyy":
            return `${d}/${m}/${y}`;
        default:
            return `${y}-${m}-${d}`;
    }
}

export function parseDate(value: string): Date | null {
    if (!value) return null;
    const date = new Date(value + "T00:00:00");
    return isNaN(date.getTime()) ? null : date;
}
