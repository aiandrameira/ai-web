import { cva, VariantProps } from "class-variance-authority";

export const badgeVariants = cva(
    "inline-flex items-center gap-2 text-xs py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default: "",
                primary: "",
                accent: "",
                outline: "",
                destructive: "",
                info: "",
                success: "",
                warning: "",
            },
            fill: {
                default: "",
                line: "",
            },
            shape: {
                default: "rounded-sm px-2",
                circle: "rounded-full px-2.5",
            },
            disabled: {
                true: "bg-[#dfdee2] dark:bg-[#2f2b2d] text-[#949498] dark:text-[#767073] pointer-events-none",
            },
        },
        defaultVariants: {
            variant: "primary",
            shape: "default",
            fill: "default",
        },
        compoundVariants: [
            {
                variant: "default",
                fill: "default",
                disabled: false,
                class: "border border-border bg-primary/10 text-primary",
            },
            {
                variant: "primary",
                fill: "default",
                disabled: false,
                class: "bg-primary text-primary-foreground hover:bg-primary/80",
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
                class: "bg-accent text-accent-foreground hover:bg-accent/80",
            },
            {
                variant: "accent",
                fill: "line",
                disabled: false,
                class: "bg-accent/15 text-accent hover:bg-accent/20 font-semibold",
            },
            {
                variant: "destructive",
                fill: "default",
                disabled: false,
                class: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
            },
            {
                variant: "destructive",
                fill: "line",
                disabled: false,
                class: "bg-destructive/15 text-destructive hover:bg-destructive/20 font-semibold",
            },
            {
                variant: "info",
                fill: "default",
                disabled: false,
                class: "bg-info text-info-foreground hover:bg-info/80",
            },
            {
                variant: "info",
                fill: "line",
                disabled: false,
                class: "bg-info/15 text-info hover:bg-info/20 font-semibold",
            },
            {
                variant: "success",
                fill: "default",
                disabled: false,
                class: "bg-success text-success-foreground hover:bg-success/80",
            },
            {
                variant: "success",
                fill: "line",
                disabled: false,
                class: "bg-success/15 text-success hover:bg-success/20 font-semibold",
            },
            {
                variant: "warning",
                fill: "default",
                disabled: false,
                class: "bg-warning text-warning-foreground hover:bg-warning/80",
            },
            {
                variant: "warning",
                fill: "line",
                disabled: false,
                class: "bg-warning/15 text-warning hover:bg-warning/20 font-semibold",
            },
            {
                variant: "outline",
                disabled: false,
                class: "text-primary border border-primary",
            },
        ],
    },
);
export type BadgeVariants = VariantProps<typeof badgeVariants>;
