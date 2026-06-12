import { cva, VariantProps } from "class-variance-authority";

export const drawerVariants = cva("bg-background overflow-hidden m-4 h-[calc(100%-2rem)] z-50 p-4 rounded-xl flex flex-col", {
    variants: {},
});

export type DrawerVariants = VariantProps<typeof drawerVariants>;
