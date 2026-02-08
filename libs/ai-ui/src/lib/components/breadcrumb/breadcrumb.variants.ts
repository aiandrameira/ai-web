import { cva, VariantProps } from "class-variance-authority";

export const breadcrumbVariants = cva("w-full flex items-center justify-between", {
    variants: {
        size: {
            sm: "text-sm",
            default: "text-base",
            lg: "text-lg",
            xl: "text-xl",
        },
    },
    defaultVariants: {
        size: "default",
    },
});

export type BreadcrumbVariants = VariantProps<typeof breadcrumbVariants>;

export const breadcrumbListVariants = cva("text-muted-foreground flex flex-wrap items-center gap-1.5 break-words sm:gap-2", {
    variants: {
        align: {
            start: "justify-start",
            center: "justify-center",
            end: "justify-end",
        },
        wrap: {
            wrap: "flex-wrap",
            nowrap: "flex-nowrap",
        },
    },
    defaultVariants: {
        align: "start",
        wrap: "wrap",
    },
});

export type BreadcrumbListVariants = VariantProps<typeof breadcrumbListVariants>;

export const breadcrumbItemVariants = cva("flex items-center gap-1.5 transition-colors", {
    variants: {
        variant: {
            default: "",
            muted: "text-muted-foreground",
            bold: "font-semibold text-foreground",
            subtle: "text-sm text-muted-foreground hover:text-foreground",
        },
        shape: {
            default: "",
            normal: "px-1 py-0.5 rounded-none",
            rounded: "px-2 py-0.5 rounded-md",
        },
    },
    defaultVariants: {
        variant: "default",
        shape: "default",
    },
});

export type BreadcrumbItemVariants = VariantProps<typeof breadcrumbItemVariants>;

export const breadcrumbLinkVariants = cva("flex items-center gap-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
    variants: {
        variant: {
            default: "hover:text-foreground",
            underline: "underline text-foreground hover:no-underline",
            subtle: "text-muted-foreground hover:text-foreground",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

export type BreadcrumbLinkVariants = VariantProps<typeof breadcrumbLinkVariants>;

export const breadcrumbPageVariants = cva("flex items-center gap-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
    variants: {
        variant: {
            default: "text-foreground",
            underline: "underline text-foreground hover:no-underline",
            subtle: "text-muted-foreground hover:text-foreground",
            current: "font-semibold text-foreground cursor-default " + "hover:text-foreground focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

export type BreadcrumbPageVariants = VariantProps<typeof breadcrumbPageVariants>;

export const breadcrumbSeparatorVariants = cva("select-none h-5 w-5 leading-5 flex items-center justify-center", {
    variants: {
        variant: {
            default: "text-muted-foreground",
            strong: "text-foreground",
            primary: "text-primary",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
export type BreadcrumbSeparatorVariants = VariantProps<typeof breadcrumbSeparatorVariants>;
