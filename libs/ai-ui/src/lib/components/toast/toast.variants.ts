import { cva, VariantProps } from "class-variance-authority";

export const toastVariants = cva("fixed flex flex-col gap-2 w-full max-w-sm z-50", {
    variants: {
        position: {
            "top-left": "top-5 left-5 items-start",
            "top-center": "top-5 left-1/2 -translate-x-1/2 items-center",
            "top-right": "top-5 right-5 items-end",
            "bottom-left": "bottom-5 left-5 items-start",
            "bottom-center": "bottom-5 left-1/2 -translate-x-1/2 items-center",
            "bottom-right": "bottom-5 right-5 items-end",
        },
    },
    defaultVariants: {
        position: "bottom-center",
    },
});

export type ToastVariants = VariantProps<typeof toastVariants>;
