import { NgModule } from "@angular/core";

import { AiPagination } from "./pagination";
import { AiPaginationButton } from "./pagination-button";
import { AiPaginationContent } from "./pagination-content";
import { AiPaginationEllipsis } from "./pagination-ellipsis";
import { AiPaginationFirst } from "./pagination-first";
import { AiPaginationItem } from "./pagination-item";
import { AiPaginationLast } from "./pagination-last";
import { AiPaginationNext } from "./pagination-next";
import { AiPaginationPrev } from "./pagination-prev";

const components = [
    AiPaginationButton,
    AiPaginationContent,
    AiPaginationEllipsis,
    AiPaginationFirst,
    AiPaginationItem,
    AiPaginationLast,
    AiPaginationNext,
    AiPaginationPrev,
    AiPagination,
] as const;
export const AiPaginationImports = [...components] as const;

@NgModule({
    imports: [...components],
    exports: [...components],
})
export class AiPaginationModule {}
