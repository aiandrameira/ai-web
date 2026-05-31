import { NgModule } from "@angular/core";

import { AiPagination } from "./pagination";
import { AiPaginationButton } from "./pagination-button";
import { AiPaginationContent } from "./pagination-content";
import { AiPaginationEllipsis } from "./pagination-ellipsis";
import { AiPaginationItem } from "./pagination-item";
import { AiPaginationNext } from "./pagination-next";
import { AiPaginationPrev } from "./pagination-prev";

const components = [AiPagination, AiPaginationContent, AiPaginationItem, AiPaginationButton, AiPaginationPrev, AiPaginationNext, AiPaginationEllipsis];
export const AiPaginationImports = [...components] as const;

@NgModule({
    imports: [...components],
    exports: [...components],
})
export class AiPaginationModule {}
