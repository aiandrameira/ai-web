import { cva, VariantProps } from "class-variance-authority";

export const stepperVariants = cva("flex flex-col w-full", {
    variants: {
        orientation: {
            horizontal: "",
            vertical: "",
        },
    },
    defaultVariants: {
        orientation: "horizontal",
    },
});

export const stepperHeaderVariants = cva("flex w-full", {
    variants: {
        orientation: {
            horizontal: "flex-row items-center mb-6",
            vertical: "flex-col items-start gap-1",
        },
    },
    defaultVariants: {
        orientation: "horizontal",
    },
});

export const stepCircleVariants = cva("flex items-center justify-center rounded-full text-sm font-medium transition-colors size-8 shrink-0", {
    variants: {
        state: {
            active: "bg-primary text-primary-foreground",
            completed: "bg-primary text-primary-foreground",
            inactive: "bg-muted text-muted-foreground border border-border",
        },
    },
    defaultVariants: {
        state: "inactive",
    },
});

export const stepLabelVariants = cva("text-sm font-medium transition-colors whitespace-nowrap", {
    variants: {
        state: {
            active: "text-foreground",
            completed: "text-foreground",
            inactive: "text-muted-foreground",
        },
    },
    defaultVariants: {
        state: "inactive",
    },
});

export const stepConnectorVariants = cva("transition-colors shrink-0", {
    variants: {
        completed: {
            true: "bg-primary",
            false: "bg-border",
        },
        orientation: {
            horizontal: "flex-1 h-0.5 mx-2",
            vertical: "w-0.5 grow my-1",
        },
    },
    defaultVariants: {
        completed: false,
        orientation: "horizontal",
    },
});

export type StepperVariants = VariantProps<typeof stepperVariants>;
export type StepCircleVariants = VariantProps<typeof stepCircleVariants>;
