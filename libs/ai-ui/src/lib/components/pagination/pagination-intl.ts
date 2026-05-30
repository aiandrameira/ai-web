import { InjectionToken } from "@angular/core";

export interface AiPaginationIntl {
    /** e.g. "Items per page:" */
    itemsPerPage: string;
    /** e.g. "/ page" — used for the page size select suffix */
    perPage: string;
    /** e.g. "of" — used in "1 – 10 of 100" */
    of: string;
    /** e.g. "total items" */
    totalItems: string;
    /** e.g. "pages" */
    pages: string;
    /** e.g. "Previous" */
    previous: string;
    /** e.g. "Next" */
    next: string;
}

export const AI_PAGINATION_INTL = new InjectionToken<AiPaginationIntl>("AiPaginationIntl");

export const AI_PAGINATION_INTL_DEFAULT: AiPaginationIntl = {
    itemsPerPage: "Items per page:",
    perPage: "/ page",
    of: "of",
    totalItems: "total items",
    pages: "pages",
    previous: "Previous",
    next: "Next",
};

export const AI_PAGINATION_INTL_PT_BR: AiPaginationIntl = {
    itemsPerPage: "Itens por página:",
    perPage: "/ página",
    of: "de",
    totalItems: "itens no total",
    pages: "páginas",
    previous: "Anterior",
    next: "Próximo",
};
