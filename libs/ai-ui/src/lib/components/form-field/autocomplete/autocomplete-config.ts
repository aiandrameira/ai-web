export interface AiAutocompleteOptions<T, Key> {
    data: T[];
    keyword: keyof T | (keyof T)[];
    useLabel: keyof T;
    useValue: keyof T;
    displayLabel?: (item: T) => string;
}

export class AiAutocompleteConfig<T, Key = unknown> {
    readonly data: T[];
    readonly keyword: (keyof T)[];
    readonly useLabel: keyof T;
    readonly useValue: keyof T;
    readonly displayLabel?: (item: T) => string;

    constructor(options: AiAutocompleteOptions<T, Key>) {
        this.data = options.data;
        this.keyword = Array.isArray(options.keyword) ? options.keyword : [options.keyword];
        this.useLabel = options.useLabel;
        this.useValue = options.useValue;
        this.displayLabel = options.displayLabel;
    }

    getLabel(item: T): string {
        if (this.displayLabel) return this.displayLabel(item);
        return String(item[this.useLabel] ?? "");
    }

    getValue(item: T): Key {
        return item[this.useValue] as unknown as Key;
    }

    filter(search: string): T[] {
        if (!search) return this.data;
        const lower = search.toLowerCase();
        return this.data.filter(item =>
            this.keyword.some(key =>
                String(item[key] ?? "")
                    .toLowerCase()
                    .includes(lower),
            ),
        );
    }

    findByValue(value: Key | null | undefined): T | undefined {
        if (value == null) return undefined;
        return this.data.find(item => (item[this.useValue] as unknown) === value);
    }
}
