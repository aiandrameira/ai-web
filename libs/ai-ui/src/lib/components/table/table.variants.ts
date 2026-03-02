import { cva } from "class-variance-authority";

export const tableWrapperVariants = cva("w-full overflow-x-auto", {
    variants: {
        border: {
            simple: "",
            outline: "rounded-md border border-border",
        },
    },
    defaultVariants: {
        border: "simple",
    },
});

export const tableHeadRowVariants = cva("bg-muted/40 text-muted-foreground", {
    variants: {
        border: {
            simple: "border-b border-border",
            outline: "",
        },
    },
    defaultVariants: {
        border: "simple",
    },
});

export const tableHeadCellVariants = cva("text-xs font-semibold uppercase font-title text-muted-foreground", {
    variants: {
        size: {
            compact: "px-3 py-2",
            default: "px-4 py-3",
            comfortable: "px-6 py-4",
        },
        border: {
            simple: "",
            outline: "border border-border",
        },
    },
    defaultVariants: {
        size: "default",
        border: "simple",
    },
});

export const tableBodyRowVariants = cva("transition-colors hover:bg-muted/50", {
    variants: {
        border: {
            simple: "border-b border-border last:border-b-0",
            outline: "",
        },
    },
    defaultVariants: {
        border: "simple",
    },
});

export const tableBodyCellVariants = cva("text-sm", {
    variants: {
        size: {
            compact: "px-3 py-1.5",
            default: "px-4 py-3",
            comfortable: "px-6 py-5",
        },
        border: {
            simple: "",
            outline: "border border-border",
        },
    },
    defaultVariants: {
        size: "default",
        border: "simple",
    },
});

export const tableCheckboxCellVariants = cva("w-10", {
    variants: {
        size: {
            compact: "px-3 py-2",
            default: "px-4 py-3",
            comfortable: "px-6 py-5",
        },
        border: {
            simple: "",
            outline: "border border-border",
        },
    },
    defaultVariants: {
        size: "default",
        border: "simple",
    },
});
