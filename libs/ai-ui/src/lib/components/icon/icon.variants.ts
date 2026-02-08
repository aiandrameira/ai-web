import { cva, VariantProps } from "class-variance-authority";

export const iconVariants = cva("flex items-center justify-center font-normal", {
    variants: {
        type: {
            line: "line",
            fill: "fill",
        },
        size: {
            sm: "text-sm",
            default: "text-base",
            lg: "text-lg",
            xl: "text-xl",
        },
    },
    defaultVariants: {
        size: "default",
        type: "line",
    },
});

export type IconVariants = VariantProps<typeof iconVariants>;
