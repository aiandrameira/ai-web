import { cva, VariantProps } from "class-variance-authority";

export const alertVariants = cva("relative flex gap-2 w-full rounded-lg py-3 px-4", {
    variants: {
        variant: {
            primary: "text-primary data-[appearance='fill']:text-primary-foreground",
            accent: "text-accent data-[appearance='fill']:text-accent-foreground",
            info: "text-info data-[appearance='fill']:text-info-foreground",
            success: "text-success data-[appearance='fill']:text-success-foreground",
            warning: "text-warning data-[appearance='fill']:text-warning-foreground",
            destructive: "text-destructive data-[appearance='fill']:text-destructive-foreground",
        },
        appearance: {
            outline:
                "border data-[type='accent']:border-accent data-[type='primary']:border-primary data-[type='info']:border-info data-[type='success']:border-success data-[type='warning']:border-warning data-[type='destructive']:border-destructive",
            soft: "border-l-4 data-[type='accent']:bg-accent/8 data-[type='primary']:bg-primary/8 data-[type='info']:bg-info/8 data-[type='success']:bg-success/8 data-[type='warning']:bg-warning/8 data-[type='destructive']:bg-destructive/8",
            fill: "data-[type='accent']:bg-accent data-[type='primary']:bg-primary data-[type='info']:bg-info data-[type='success']:bg-success data-[type='warning']:bg-warning data-[type='destructive']:bg-destructive",
        },
    },
    defaultVariants: {
        variant: "primary",
        appearance: "outline",
    },
});
export type AlertVariants = VariantProps<typeof alertVariants>;
