import { cva, VariantProps } from "class-variance-authority";

export const datetimeVariants = cva(
    "block w-full text-sm text-muted-foreground appearance-none focus:outline-none focus:ring-0 peer bg-transparent rounded-lg border-2 px-2.5 pb-2.5 pt-4",
    {
        variants: {
            error: {
                true: "border-destructive text-destructive focus:border-destructive",
                false: "border-input focus:border-primary",
            },
            disabled: {
                true: "pointer-events-none opacity-50",
            },
        },
        defaultVariants: {
            error: false,
        },
    },
);

export const datetimeLabelVariants = cva(
    "absolute text-sm text-muted-foreground duration-300 origin-[0] pointer-events-none -translate-y-4 scale-75 top-2 z-10 bg-background px-2 start-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-primary",
    {
        variants: {
            error: {
                true: "text-destructive peer-focus:text-destructive",
                false: "",
            },
            disabled: {
                true: "text-[#949498] dark:text-[#767073] pointer-events-none",
            },
        },
        defaultVariants: {
            error: false,
        },
    },
);

export type DatetimeVariants = VariantProps<typeof datetimeVariants>;
