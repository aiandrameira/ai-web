import { cva, VariantProps } from "class-variance-authority";

export const checkboxVariants = cva(
    "cursor-[unset] peer appearance-none border transition shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                primary: "border-primary checked:bg-primary",
                accent: "border-accent checked:bg-accent",
                destructive: "border-destructive checked:bg-destructive",
            },
            size: {
                default: "h-4 w-4",
                lg: "h-6 w-6",
            },
            shape: {
                default: "rounded",
                circle: "rounded-full",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
            shape: "default",
        },
    },
);

export const checkboxLabelVariants = cva("cursor-[unset] text-current empty:hidden", {
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

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;
export type CheckboxLabelVariants = VariantProps<typeof checkboxLabelVariants>;
