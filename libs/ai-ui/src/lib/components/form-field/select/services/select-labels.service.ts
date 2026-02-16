import { Injectable } from "@angular/core";

import { AiSelectItem } from "../select-item";

interface AiLabelConfig<T = unknown> {
    value: T | T[] | undefined;
    multiple: boolean;
    maxLabelCount: number;
    manualLabel: string;
    items: readonly AiSelectItem[];
}

@Injectable()
export class AiSelectLabelsService {
    getLabels({ value, multiple, maxLabelCount, manualLabel, items }: AiLabelConfig): string[] {
        const isMultiple = multiple && Array.isArray(value);
        const normalizedValue = value ?? "";

        if (isMultiple) {
            return this._provideLabelsForMultiselectMode(normalizedValue as string[], items, maxLabelCount);
        }

        return this._provideLabelForSingleSelectMode(normalizedValue as string, manualLabel, items);
    }

    private _provideLabelsForMultiselectMode(selectedValues: string[], items: readonly AiSelectItem[], maxLabelCount: number): string[] {
        const labelsToShowCount = selectedValues.length - maxLabelCount;
        const labels: string[] = [];
        let index = 0;

        for (const value of selectedValues) {
            const matchingItem = items.find(item => item.value() === value);
            if (matchingItem) {
                labels.push(matchingItem.label());
                index++;
            }

            if (labelsToShowCount && maxLabelCount && index === maxLabelCount) {
                labels.push(`${labelsToShowCount} more item${labelsToShowCount > 1 ? "s" : ""} selected`);
                break;
            }
        }

        return labels;
    }

    private _provideLabelForSingleSelectMode(selectedValue: string, manualLabel: string, items: readonly AiSelectItem[]): string[] {
        if (manualLabel) return [manualLabel];

        const matchingItem = items.find(item => item.value() === selectedValue);
        if (matchingItem) return [matchingItem.label()];

        return selectedValue ? [selectedValue] : [];
    }
}
