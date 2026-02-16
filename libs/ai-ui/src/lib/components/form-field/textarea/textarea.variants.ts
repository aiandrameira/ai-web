import { cva, VariantProps } from "class-variance-authority";

export const textareaVariants = cva("block w-full text-sm text-muted-foreground appearance-none focus:outline-none focus:ring-0 peer", {
    variants: {
        variant: {
            outlined: "px-2.5 pb-2.5 pt-4 bg-transparent rounded-lg border-2 border-input focus:border-primary",
            standard: "py-2.5 px-0 bg-transparent border-0 border-b-2 border-input focus:border-primary",
            filled: "bg-transparent border-2 border-input rounded-lg focus:border-primary px-2.5 py-3 placeholder:text-muted-foreground",
        },
        resize: {
            none: "resize-none",
            vertical: "resize-y",
            horizontal: "resize-x",
            both: "resize",
        },
        error: {
            true: "border-destructive text-destructive focus:border-destructive placeholder:text-destructive placeholder:opacity-80",
        },
        disabled: {
            true: "pointer-events-none opacity-50",
        },
    },
    defaultVariants: {
        variant: "outlined",
        resize: "none",
    },
});

export const textareaLabelVariants = cva("text-sm text-muted-foreground duration-300", {
    variants: {
        variant: {
            outlined:
                "absolute origin-[0] pointer-events-none -translate-y-4 scale-75 top-2 z-10 bg-background px-2 start-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-5 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-primary",
            standard:
                "absolute origin-[0] pointer-events-none -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-primary",
            filled: "block mb-1.5 font-semibold",
        },
        error: {
            true: "text-destructive peer-focus:text-destructive",
        },
        disabled: {
            true: "text-[#949498] dark:text-[#767073] pointer-events-none",
        },
    },
    defaultVariants: {
        variant: "outlined",
    },
});

export type TextareaVariants = VariantProps<typeof textareaVariants>;
export type TextareaLabelVariants = VariantProps<typeof textareaLabelVariants>;
