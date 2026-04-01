import { cva, VariantProps } from "class-variance-authority";

import { mergeClasses } from "../../../core";

export const segmentedVariants = cva(mergeClasses("inline-flex items-center rounded-lg bg-muted p-1 text-muted-foreground"));

export const segmentedItemVariants = cva(
    mergeClasses(
        "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md font-medium transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-active:bg-background data-active:text-foreground data-active:shadow-sm",
    ),
    {
        variants: {
            size: {
                sm: "px-2 py-1 text-xs",
                normal: "px-3 py-1.5 text-sm",
                lg: "px-4 py-2 text-base",
            },
        },
        defaultVariants: {
            size: "normal",
        },
    },
);

export type SegmentedVariants = VariantProps<typeof segmentedItemVariants>;
