import { InjectionToken } from "@angular/core";

export interface AiPaginationIntl {
    itemsPerPage: string;
    perPage: string;
    of: string;
    totalItems: string;
    pages: string;
    first: string;
    previous: string;
    next: string;
    last: string;
}

export const AI_PAGINATION_INTL = new InjectionToken<AiPaginationIntl>("AiPaginationIntl");

export const AI_PAGINATION_INTL_DEFAULT: AiPaginationIntl = {
    itemsPerPage: "Items per page:",
    perPage: "/ page",
    of: "of",
    totalItems: "total items",
    pages: "pages",
    first: "First page",
    previous: "Previous",
    next: "Next",
    last: "Last page",
};

export const AI_PAGINATION_INTL_PT_BR: AiPaginationIntl = {
    itemsPerPage: "Itens por página:",
    perPage: "/ página",
    of: "de",
    totalItems: "itens no total",
    pages: "páginas",
    first: "Primeira página",
    previous: "Anterior",
    next: "Próximo",
    last: "Última página",
};
