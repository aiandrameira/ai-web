import { DemoBreadcrumbContentComponent } from "./content";
import { DemoBreadcrumbCustomSeparatorComponent } from "./custom-separator";
import { DemoBreadcrumbDefaultComponent } from "./default";
import { DemoBreadcrumbDirectiveComponent } from "./directive";
import { DemoBreadcrumbEllipsisComponent } from "./ellipsis";
import { DemoBreadcrumbIconComponent } from "./icon";
import { DemoBreadcrumbRouterLinkComponent } from "./router-link";

export const BREADCRUMB = {
    componentName: "breadcrumb",
    componentType: "breadcrumb",
    examples: [
        { name: "default", component: DemoBreadcrumbDefaultComponent },
        { name: "content", component: DemoBreadcrumbContentComponent },
        { name: "router-link", component: DemoBreadcrumbRouterLinkComponent },
        { name: "icon", component: DemoBreadcrumbIconComponent },
        { name: "directive", component: DemoBreadcrumbDirectiveComponent },
        { name: "custom-separator", component: DemoBreadcrumbCustomSeparatorComponent },
        { name: "ellipsis", component: DemoBreadcrumbEllipsisComponent },
    ],
};
