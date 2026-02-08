import { cva, VariantProps } from "class-variance-authority";

export const separatorVariants = cva("block bg-border", {
    variants: {
        orientation: {
            horizontal: "h-[1px] w-full my-1.5",
            vertical: "h-full w-[1px] inline-block",
        },
    },
    defaultVariants: {
        orientation: "horizontal",
    },
});

export type SeparatorVariants = VariantProps<typeof separatorVariants>;
