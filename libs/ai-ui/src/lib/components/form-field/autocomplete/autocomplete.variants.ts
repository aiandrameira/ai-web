import { cva, VariantProps } from "class-variance-authority";

import { mergeClasses } from "../../../core";

export const autocompleteInputVariants = cva(
    mergeClasses(
        "block w-full text-sm text-muted-foreground appearance-none focus:outline-none focus:ring-0 peer",
        "px-4 pb-2.5 pt-4 pr-16 bg-transparent rounded-lg border-2 border-input focus:border-primary",
    ),
    {
        variants: {
            error: {
                true: "border-destructive text-destructive focus:border-destructive placeholder:text-destructive placeholder:opacity-80",
            },
            disabled: {
                true: "pointer-events-none opacity-50",
            },
        },
    },
);

export const autocompleteLabelVariants = cva(
    mergeClasses(
        "absolute text-sm text-muted-foreground duration-300 origin-[0] pointer-events-none",
        "-translate-y-4 scale-75 top-2 z-10 bg-background px-2 start-3",
        "peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2",
        "peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-primary",
    ),
    {
        variants: {
            error: {
                true: "text-destructive peer-focus:text-destructive",
            },
            disabled: {
                true: "text-[#949498] dark:text-[#767073] pointer-events-none",
            },
        },
    },
);

export const autocompleteDropdownVariants = cva(
    mergeClasses("z-9999 w-full scrollbar-hide overflow-hidden rounded-md border border-border bg-background text-muted-foreground shadow-lg animate-in fade-in-0 zoom-in-95"),
);

export const autocompleteItemVariants = cva(
    mergeClasses(
        "relative flex w-full cursor-pointer items-center gap-2 rounded-sm mb-0.5 px-3 min-h-9 py-1.5 text-sm",
        "outline-hidden select-none transition-colors duration-150",
        "hover:bg-default hover:text-default-foreground",
        "data-selected:text-primary",
    ),
);

export type AutocompleteVariants = VariantProps<typeof autocompleteInputVariants>;
