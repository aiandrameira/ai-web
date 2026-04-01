import { cva, VariantProps } from "class-variance-authority";

export const datePickerTriggerVariants = cva(
    "inline-flex items-center justify-between gap-2 rounded-lg border-2 px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background w-full cursor-pointer",
    {
        variants: {
            error: {
                true: "border-destructive text-destructive",
                false: "border-input text-muted-foreground hover:border-primary",
            },
            disabled: {
                true: "pointer-events-none opacity-50 cursor-not-allowed",
            },
        },
        defaultVariants: {
            error: false,
        },
    },
);

export const datePickerCalendarVariants = cva("rounded-lg border bg-background p-3 text-muted-foreground shadow-md animate-in fade-in-0 zoom-in-95");

export type DatePickerTriggerVariants = VariantProps<typeof datePickerTriggerVariants>;
