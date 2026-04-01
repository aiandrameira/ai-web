import { cva, VariantProps } from "class-variance-authority";

export const skeletonVariants = cva("bg-default animate-pulse rounded-md", {
    variants: {},
    defaultVariants: {},
});

export type SkeletonVariants = VariantProps<typeof skeletonVariants>;
