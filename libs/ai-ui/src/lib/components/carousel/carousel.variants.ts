import { cva, VariantProps } from "class-variance-authority";

export const carouselVariants = cva("relative w-full overflow-hidden select-none", {
    variants: {
        orientation: {
            horizontal: "",
            vertical: "",
        },
    },
    defaultVariants: {
        orientation: "horizontal",
    },
});

export const carouselTrackVariants = cva("flex transition-transform duration-300 ease-out", {
    variants: {
        orientation: {
            horizontal: "flex-row",
            vertical: "flex-col",
        },
        dragging: {
            true: "transition-none",
            false: "",
        },
    },
    defaultVariants: {
        orientation: "horizontal",
        dragging: false,
    },
});

export const carouselItemVariants = cva("min-w-0 shrink-0 grow-0", {
    variants: {
        orientation: {
            horizontal: "w-full",
            vertical: "h-full",
        },
    },
    defaultVariants: {
        orientation: "horizontal",
    },
});

export const carouselNavVariants = cva(
    "inline-flex items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm cursor-pointer hover:bg-muted disabled:pointer-events-none disabled:opacity-50 transition-colors",
    {
        variants: {
            size: {
                sm: "size-7",
                md: "size-9",
            },
        },
        defaultVariants: {
            size: "md",
        },
    },
);

export const carouselDotVariants = cva("rounded-full cursor-pointer transition-all duration-200", {
    variants: {
        active: {
            true: "bg-primary w-6 h-2",
            false: "bg-muted-foreground/30 hover:bg-muted-foreground/50 size-2",
        },
    },
    defaultVariants: {
        active: false,
    },
});

export type CarouselVariants = VariantProps<typeof carouselVariants>;
