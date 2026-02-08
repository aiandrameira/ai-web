import { cva, VariantProps } from "class-variance-authority";

export const floatButtonVariants = cva("inline-flex items-center justify-center w-auto transition-colors duration-300 cursor-pointer", {
    variants: {
        variant: {
            primary: "bg-primary text-primary-foreground hover:bg-primary/90",
            accent: "bg-accent text-accent-foreground hover:bg-accent/90",
            default: "shadow-sm bg-background text-muted-foreground hover:bg-default/20 hover:text-primary",
        },
        shape: {
            default: "rounded-lg",
            circle: "rounded-full",
        },
        size: {
            default: "h-10 px-3 py-2",
            lg: "h-12 px-4 py-2",
        },
    },
    defaultVariants: {
        variant: "default",
        shape: "default",
        size: "default",
    },
});

export type FloatButtonVariants = VariantProps<typeof floatButtonVariants>;
