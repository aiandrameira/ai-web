import { cva, VariantProps } from "class-variance-authority";

export const avatarVariants = cva("relative flex flex-row items-center justify-center box-content cursor-default bg-default", {
    variants: {
        size: {
            xs: "size-6",
            sm: "size-8",
            default: "size-10",
            md: "size-12",
            lg: "size-14",
            xl: "size-16",
        },
        shape: {
            default: "rounded-md",
            circle: "rounded-full",
        },
    },
    defaultVariants: {
        size: "default",
        shape: "default",
    },
});

export const imageVariants = cva("relative object-cover object-center w-full h-full z-10", {
    variants: {
        shape: {
            default: "rounded-md",
            circle: "rounded-full",
        },
    },
    defaultVariants: {
        shape: "default",
    },
});

export const avatarGroupVariants = cva("flex items-center [&_img]:ring-2 [&_img]:ring-background", {
    variants: {
        orientation: {
            horizontal: "flex-row -space-x-3",
            vertical: "flex-col -space-y-3",
        },
    },
    defaultVariants: {
        orientation: "horizontal",
    },
});

export type AvatarVariants = VariantProps<typeof avatarVariants>;
export type ImageVariants = VariantProps<typeof imageVariants>;
export type AvatarGroupVariants = VariantProps<typeof avatarGroupVariants>;
