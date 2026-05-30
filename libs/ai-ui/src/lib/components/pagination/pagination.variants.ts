import { cva, VariantProps } from "class-variance-authority";

export const paginationContentVariants = cva("flex flex-row items-center gap-1");

export const paginationPreviousVariants = cva("gap-1 px-2.5 sm:pl-2.5");

export const paginationNextVariants = cva("gap-1 px-2.5 sm:pr-2.5");

export const paginationEllipsisVariants = cva("flex size-9 items-center justify-center");

export const paginationVariants = cva("mx-auto flex w-full justify-center");

export type PaginationContentVariants = VariantProps<typeof paginationContentVariants>;
export type PaginationPreviousVariants = VariantProps<typeof paginationPreviousVariants>;
export type PaginationNextVariants = VariantProps<typeof paginationNextVariants>;
export type PaginationEllipsisVariants = VariantProps<typeof paginationEllipsisVariants>;
export type PaginationVariants = VariantProps<typeof paginationVariants>;
