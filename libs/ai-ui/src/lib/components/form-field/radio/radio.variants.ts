import { cva, VariantProps } from "class-variance-authority";

export const radioVariants = cva(
    "appearance-none rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
    {
        variants: {
            variant: {
                primary: "border-input data-checked:border-primary data-checked:bg-primary",
                accent: "border-input data-checked:border-accent data-checked:bg-accent",
                destructive: "border-input data-checked:border-destructive data-checked:bg-destructive",
            },
            size: {
                default: "size-4",
                lg: "size-5",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    },
);

export const radioLabelVariants = cva("cursor-pointer select-none text-muted-foreground empty:hidden", {
    variants: {
        size: {
            default: "text-sm",
            lg: "text-base",
        },
    },
    defaultVariants: {
        size: "default",
    },
});

export type RadioVariants = VariantProps<typeof radioVariants>;
