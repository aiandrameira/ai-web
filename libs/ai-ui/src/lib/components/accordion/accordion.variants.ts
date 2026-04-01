import { cva, VariantProps } from "class-variance-authority";

export const accordionVariants = cva("flex flex-col w-full divide-y divide-border border border-border rounded-lg overflow-hidden", {
    variants: {},
    defaultVariants: {},
});

export const accordionHeaderVariants = cva(
    "flex w-full items-center gap-4 py-4 px-4 text-left cursor-pointer transition-colors hover:bg-muted/50 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {},
        defaultVariants: {},
    },
);

export const accordionContentVariants = cva("grid transition-[grid-template-rows] duration-200 ease-out", {
    variants: {
        expanded: {
            true: "grid-rows-[1fr]",
            false: "grid-rows-[0fr]",
        },
    },
    defaultVariants: {
        expanded: false,
    },
});

export const accordionToggleVariants = cva("shrink-0 text-muted-foreground transition-transform duration-200", {
    variants: {
        expanded: {
            true: "rotate-180",
            false: "",
        },
    },
    defaultVariants: {
        expanded: false,
    },
});

export type AccordionVariants = VariantProps<typeof accordionVariants>;
