import { cva, VariantProps } from "class-variance-authority";

export const alertDialogVariants = cva("fixed z-50 w-full max-w-sm w-full bg-background shadow-lg rounded-lg");

export type AlertDialogVariants = VariantProps<typeof alertDialogVariants>;
