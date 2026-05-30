import { cva, VariantProps } from "class-variance-authority";

export const switchVariants = cva(
    "relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                primary: "data-checked:bg-primary bg-input",
                accent: "data-checked:bg-accent bg-input",
                destructive: "data-checked:bg-destructive bg-input",
            },
            size: {
                sm: "h-4 w-8",
                normal: "h-5 w-10",
                lg: "h-6 w-12",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "normal",
        },
    },
);

export const switchThumbVariants = cva("pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform", {
    variants: {
        size: {
            sm: "size-3 data-checked:translate-x-4",
            normal: "size-4 data-checked:translate-x-5",
            lg: "size-5 data-checked:translate-x-6",
        },
    },
    defaultVariants: {
        size: "normal",
    },
});

export const switchLabelVariants = cva("cursor-pointer select-none empty:hidden", {
    variants: {
        size: {
            sm: "text-xs",
            normal: "text-sm",
            lg: "text-base",
        },
    },
    defaultVariants: {
        size: "normal",
    },
});

export type SwitchVariants = VariantProps<typeof switchVariants>;
