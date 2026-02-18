import { cva, VariantProps } from "class-variance-authority";

export const cardVariants = cva("block cursor-default border border-border rounded-lg w-full max-w-sm transition-colors duration-500", {
    variants: {
        disabled: {
            true: "cursor-not-allowed pointer-events-none opacity-50",
        },
    },
});
export type CardVariants = VariantProps<typeof cardVariants>;

export const cardHeaderVariants = cva("w-full flex flex-col text-left pt-6 px-6", {
    variants: {},
});
export type CardHeaderVariants = VariantProps<typeof cardHeaderVariants>;

export const cardBodyVariants = cva("px-6", {
    variants: {},
});
export type CardBodyVariants = VariantProps<typeof cardBodyVariants>;
