import { cva, VariantProps } from "class-variance-authority";

export const paginationContentVariants = cva("flex flex-row items-center gap-1");

export const paginationFirstVariants = cva("gap-1 px-2.5");

export const paginationPreviousVariants = cva("gap-1 px-2.5 sm:pl-2.5 text-muted-foreground");

export const paginationNextVariants = cva("gap-1 px-2.5 sm:pr-2.5");

export const paginationLastVariants = cva("gap-1 px-2.5");

export const paginationEllipsisVariants = cva("flex size-9 items-center justify-center");

export const paginationVariants = cva("mx-auto flex w-full justify-center");

export type PaginationContentVariants = VariantProps<typeof paginationContentVariants>;
export type PaginationFirstVariants = VariantProps<typeof paginationFirstVariants>;
export type PaginationPreviousVariants = VariantProps<typeof paginationPreviousVariants>;
export type PaginationNextVariants = VariantProps<typeof paginationNextVariants>;
export type PaginationLastVariants = VariantProps<typeof paginationLastVariants>;
export type PaginationEllipsisVariants = VariantProps<typeof paginationEllipsisVariants>;
export type PaginationVariants = VariantProps<typeof paginationVariants>;
