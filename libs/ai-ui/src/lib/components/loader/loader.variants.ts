import { cva, VariantProps } from "class-variance-authority";

export const loaderVariants = cva("", {
    variants: {
        type: {
            spinner: "",
            dots: "",
            progress: "",
        },
        size: {
            default: "size-10",
            sm: "size-6",
            md: "size-8",
            lg: "size-16",
        },
        overlay: {
            true: "bg-black/30 fixed top-0 left-0 h-screen w-screen flex items-center justify-center z-999",
        },
    },
    defaultVariants: {
        size: "default",
        type: "spinner",
        overlay: false,
    },
});

export type LoaderVariants = VariantProps<typeof loaderVariants>;
