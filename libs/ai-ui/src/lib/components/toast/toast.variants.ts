import { cva, VariantProps } from "class-variance-authority";

export const toastVariants = cva("fixed flex flex-col gap-2 max-w-sm z-[1050]", {
    variants: {
        position: {
            // The left+right pair (dropped again at `sm:`) keeps the box inside the viewport on
            // narrow screens instead of overflowing past the edge opposite its anchored side —
            // `w-full` alone bled ~20px off-screen on mobile since it resolves against the
            // viewport while only one side offset was set.
            "top-left": "top-5 left-5 right-5 items-start sm:right-auto",
            "top-center": "top-5 left-1/2 w-full -translate-x-1/2 items-center",
            "top-right": "top-5 right-5 left-5 items-end sm:left-auto",
            "bottom-left": "bottom-5 left-5 right-5 items-start sm:right-auto",
            "bottom-center": "bottom-5 left-1/2 w-full -translate-x-1/2 items-center",
            "bottom-right": "bottom-5 right-5 left-5 items-end sm:left-auto",
        },
    },
    defaultVariants: {
        position: "bottom-center",
    },
});

export type ToastVariants = VariantProps<typeof toastVariants>;
