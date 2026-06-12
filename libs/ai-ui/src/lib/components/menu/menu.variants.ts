import { cva, VariantProps } from "class-variance-authority";

export const menuContentVariants = cva("bg-background text-foreground z-[9999] min-w-[200px] max-w-[500px] overflow-y-auto rounded-md border border-border p-1 shadow-lg");

export const menuItemVariants = cva(
    "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-default hover:text-primary focus:bg-default focus:text-primary focus-visible:bg-default focus-visible:text-primary data-[highlighted]:bg-default data-[highlighted]:text-default-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "",
                destructive: "text-destructive hover:bg-destructive/10 focus:bg-destructive/10 dark:hover:bg-destructive/20 dark:focus:bg-destructive/20 focus:text-destructive",
            },
            inset: {
                true: "pl-8",
                false: "",
            },
        },
        defaultVariants: {
            variant: "default",
            inset: false,
        },
    },
);

export const menuLabelVariants = cva("relative flex items-center px-2 py-1.5 text-sm font-medium text-muted-foreground/90", {
    variants: {
        inset: {
            true: "pl-8",
            false: "",
        },
    },
    defaultVariants: {
        inset: false,
    },
});

export const menuShortcutVariants = cva("ml-auto text-xs tracking-widest text-muted-foreground/90");

export type AiMenuItemVariants = VariantProps<typeof menuItemVariants>;
export type AiMenuLabelVariants = VariantProps<typeof menuLabelVariants>;
