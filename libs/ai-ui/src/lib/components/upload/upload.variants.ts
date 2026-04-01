import { cva, VariantProps } from "class-variance-authority";

export const uploadVariants = cva("flex w-full cursor-pointer transition-colors", {
    variants: {
        type: {
            button: "flex-row items-center gap-3 rounded-lg border border-border px-4 py-3 hover:bg-muted/50",
            dropzone: "flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-8 hover:border-primary/50 hover:bg-muted/30",
        },
        disabled: {
            true: "pointer-events-none opacity-50",
            false: "",
        },
    },
    defaultVariants: {
        type: "button",
        disabled: false,
    },
});

export const uploadSelectedVariants = cva("flex items-center w-full rounded-lg border border-border transition-colors", {
    variants: {
        type: {
            list: "flex-row gap-3 px-4 py-3",
            card: "flex-col overflow-hidden",
        },
    },
    defaultVariants: {
        type: "list",
    },
});

export type UploadVariants = VariantProps<typeof uploadVariants>;
export type UploadSelectedVariants = VariantProps<typeof uploadSelectedVariants>;
