import { cva, type VariantProps } from "class-variance-authority";

export const commandVariants = cva("flex h-full w-full flex-col overflow-hidden shadow-md border border-border rounded-md bg-background text-background-foreground", {
    variants: {
        size: {
            sm: "min-h-64",
            default: "min-h-80",
            lg: "min-h-96",
            xl: "min-h-120",
        },
    },
    defaultVariants: {
        size: "default",
    },
});

export const commandInputVariants = cva(
    "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {},
        defaultVariants: {},
    }
);

export const commandListVariants = cva("max-h-75 overflow-y-auto overflow-x-hidden p-1", {
    variants: {},
    defaultVariants: {},
});

export const commandGroupVariants = cva("overflow-hidden text-foreground", {
    variants: {},
    defaultVariants: {},
});

export const commandGroupHeadingVariants = cva("px-2 py-1.5 text-xs font-semibold font-title text-muted-foreground", {
    variants: {},
    defaultVariants: {},
});

export const commandItemVariants = cva(
    "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-default hover:text-default-foreground aria-selected:bg-default aria-selected:text-default-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
    {
        variants: {
            variant: {
                default: "",
                destructive: "aria-selected:bg-destructive aria-selected:text-destructive-foreground hover:bg-destructive hover:text-destructive-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export const commandSeparatorVariants = cva("-mx-1 my-1 h-px bg-border", {
    variants: {},
    defaultVariants: {},
});

export const commandShortcutVariants = cva("ml-auto text-xs tracking-widest text-muted-foreground", {
    variants: {},
    defaultVariants: {},
});

export type CommandSizeVariants = NonNullable<VariantProps<typeof commandVariants>["size"]>;
export type CommandItemVariants = NonNullable<VariantProps<typeof commandItemVariants>["variant"]>;
