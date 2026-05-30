import { cva, VariantProps } from "class-variance-authority";

export const progressBarVariants = cva("relative w-full overflow-hidden rounded-full bg-muted", {
    variants: {
        size: {
            sm: "h-1.5",
            normal: "h-3",
            lg: "h-5",
        },
    },
    defaultVariants: {
        size: "normal",
    },
});

export const progressBarFillVariants = cva("h-full transition-all duration-300 ease-in-out rounded-full", {
    variants: {
        variant: {
            primary: "bg-primary",
            accent: "bg-accent",
        },
        indeterminate: {
            true: "ai-bar-indeterminate absolute",
            false: "",
        },
    },
    defaultVariants: {
        variant: "primary",
        indeterminate: false,
    },
});

export const progressBarCircleVariants = cva("relative inline-flex items-center justify-center", {
    variants: {
        size: {
            sm: "h-16 w-16",
            normal: "h-24 w-24",
            lg: "h-32 w-32",
        },
    },
    defaultVariants: {
        size: "normal",
    },
});

export type ProgressBarVariants = VariantProps<typeof progressBarVariants>;
export type ProgressBarFillVariants = VariantProps<typeof progressBarFillVariants>;
export type ProgressBarCircleVariants = VariantProps<typeof progressBarCircleVariants>;

export type ProgressBarSize = NonNullable<ProgressBarVariants["size"]>;
export type ProgressBarShape = "normal" | "circle";
export type ProgressBarVariant = NonNullable<ProgressBarFillVariants["variant"]>;
