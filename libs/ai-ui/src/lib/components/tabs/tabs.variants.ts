import { cva, VariantProps } from "class-variance-authority";

export const tabsGroupVariants = cva("flex w-full", {
    variants: {
        tabsPosition: {
            top: "flex-col",
            bottom: "flex-col-reverse",
            left: "flex-row",
            right: "flex-row-reverse",
        },
    },
    defaultVariants: {
        tabsPosition: "top",
    },
});

export const tabsHeaderVariants = cva("flex shrink-0 border-border", {
    variants: {
        tabsPosition: {
            top: "flex-row border-b",
            bottom: "flex-row border-t",
            left: "flex-col border-r",
            right: "flex-col border-l",
        },
        alignTabs: {
            start: "justify-start",
            center: "justify-center",
            end: "justify-end",
        },
    },
    defaultVariants: {
        tabsPosition: "top",
        alignTabs: "start",
    },
});

export const tabButtonVariants = cva(
    "relative inline-flex items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors cursor-pointer disabled:pointer-events-none disabled:opacity-50 text-muted-foreground hover:text-foreground",
    {
        variants: {
            active: {
                true: "text-foreground",
                false: "",
            },
        },
        defaultVariants: {
            active: false,
        },
    },
);

export const tabIndicatorVariants = cva("absolute bg-primary transition-all duration-200", {
    variants: {
        activePosition: {
            top: "top-0 left-0 right-0 h-0.5",
            bottom: "bottom-0 left-0 right-0 h-0.5",
            left: "left-0 top-0 bottom-0 w-0.5",
            right: "right-0 top-0 bottom-0 w-0.5",
        },
    },
    defaultVariants: {
        activePosition: "bottom",
    },
});

export type TabsGroupVariants = VariantProps<typeof tabsGroupVariants>;
export type TabPosition = NonNullable<TabsGroupVariants["tabsPosition"]>;
export type TabAlign = NonNullable<VariantProps<typeof tabsHeaderVariants>["alignTabs"]>;
export type TabActivePosition = NonNullable<VariantProps<typeof tabIndicatorVariants>["activePosition"]>;
