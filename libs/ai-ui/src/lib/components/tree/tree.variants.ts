import { cva, VariantProps } from "class-variance-authority";

export const treeVariants = cva("flex flex-col w-full text-sm", {
    variants: {},
    defaultVariants: {},
});

export const treeNodeVariants = cva("flex w-full items-center gap-1.5 py-1 pr-1.5 rounded-md cursor-pointer select-none transition-colors hover:bg-muted/50", {
    variants: {
        selected: {
            true: "bg-muted text-foreground",
            false: "text-muted-foreground",
        },
    },
    defaultVariants: {
        selected: false,
    },
});

export type TreeVariants = VariantProps<typeof treeVariants>;
export type TreeNodeVariants = VariantProps<typeof treeNodeVariants>;
