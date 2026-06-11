import { NgModule } from "@angular/core";

import { AiBreadcrumbContent } from "./breadcrumb-content";
import { AiBreadcrumbEllipsis } from "./breadcrumb-ellipsis";
import { AiBreadcrumbItem } from "./breadcrumb-item";
import { AiBreadcrumbLink } from "./breadcrumb-link";
import { AiBreadcrumbList } from "./breadcrumb-list";
import { AiBreadcrumbPage } from "./breadcrumb-page";
import { AiBreadcrumbSeparator } from "./breadcrumb-separator";

const components = [AiBreadcrumbContent, AiBreadcrumbItem, AiBreadcrumbList, AiBreadcrumbLink, AiBreadcrumbPage, AiBreadcrumbSeparator, AiBreadcrumbEllipsis] as const;

export const AiBreadcrumbImports = [...components] as const;

@NgModule({
    imports: [...components],
    exports: [...components],
})
export class AiBreadcrumbModule {}
