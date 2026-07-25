import { DemoPaginationCursorComponent } from "./cursor";
import { DemoPaginationCustomComponent } from "./custom";
import { DemoPaginationDefaultComponent } from "./default";
import { DemoPaginationInfoComponent } from "./info";
import { DemoPaginationIntlComponent } from "./intl";

export const PAGINATION = {
    componentName: "pagination",
    componentType: "pagination",
    examples: [
        { name: "default", component: DemoPaginationDefaultComponent },
        { name: "cursor", component: DemoPaginationCursorComponent },
        { name: "custom", component: DemoPaginationCustomComponent },
        { name: "info", component: DemoPaginationInfoComponent },
        { name: "intl", component: DemoPaginationIntlComponent },
    ],
};
