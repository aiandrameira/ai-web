import { cva, VariantProps } from "class-variance-authority";

export const buttonToggleVariants = cva("flex w-fit items-center rounded-md", {
    variants: {
        variant: {
            primary: "",
            outline: "shadow",
        },
        size: {
            sm: "",
            default: "",
            lg: "",
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "default",
    },
});

export const buttonToggleItemVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-none gap-2 text-sm font-text font-mediu text-muted-foreground ring-offset-background transition-colors hover:bg-primary/8 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-primary/8 data-[state=on]:text-primary",
    {
        variants: {
            variant: {
                primary: "bg-transparent",
                outline: "border border-input bg-transparent hover:bg-primary/10 hover:text-primary",
            },
            size: {
                sm: "h-8 px-2.5 text-xs",
                default: "h-9 px-3 text-sm",
                lg: "h-10 px-4 text-sm",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    },
);

export type ButtonToggleVariants = VariantProps<typeof buttonToggleVariants>;
export type ButtonToggleItemVariants = VariantProps<typeof buttonToggleItemVariants>;
