import { cva, VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
    "cursor-pointer inline-flex items-center justify-center gap-2 rounded-md text-sm font-text font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                primary: "",
                accent: "",
                outline: "",
                ghost: "",
                destructive: "",
                link: "",
                default: "",
            },
            fill: {
                default: "",
                line: "",
            },
            size: {
                default: "h-10 py-2 px-4",
                lg: "h-11 px-8",
                sm: "h-8 px-3",
                xs: "h-8 w-8",
            },
            shape: {
                default: "rounded-md",
                circle: "rounded-full",
            },
            full: {
                true: "w-full",
            },
            loading: {
                true: "opacity-50 pointer-events-none",
            },
            disabled: {
                true: "bg-[#dfdee2] dark:bg-[#2f2b2d] text-[#949498] dark:text-[#767073] pointer-events-none",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
            shape: "default",
            fill: "default",
        },
        compoundVariants: [
            {
                variant: "primary",
                fill: "default",
                disabled: false,
                class: "bg-primary text-primary-foreground hover:bg-primary/90",
            },
            {
                variant: "primary",
                fill: "line",
                disabled: false,
                class: "bg-primary/10 text-primary hover:bg-primary/15",
            },
            {
                variant: "accent",
                fill: "default",
                disabled: false,
                class: "bg-accent text-accent-foreground hover:bg-accent/90",
            },
            {
                variant: "accent",
                fill: "line",
                disabled: false,
                class: "bg-accent/15 text-accent hover:bg-accent/20",
            },
            {
                variant: "destructive",
                fill: "default",
                disabled: false,
                class: "bg-destructive text-white hover:bg-destructive/90",
            },
            {
                variant: "destructive",
                fill: "line",
                disabled: false,
                class: "bg-destructive/15 text-destructive hover:bg-destructive/20",
            },
            {
                variant: "ghost",
                disabled: false,
                class: "text-ghost-foreground hover:bg-ghost hover:text-primary",
            },
            {
                variant: "link",
                disabled: false,
                class: "underline-offset-4 hover:underline text-primary",
            },
            {
                variant: "outline",
                disabled: false,
                class: "border border-primary/70 text-primary/70 hover:bg-primary hover:text-primary hover:bg-transparent",
            },
            {
                variant: "default",
                disabled: false,
                class: "bg-default/90 text-default-foreground/80 hover:bg-default hover:text-primary",
            },
        ],
    }
);
export type ButtonVariants = VariantProps<typeof buttonVariants>;
