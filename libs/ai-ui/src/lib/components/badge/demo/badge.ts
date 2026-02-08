import { DemoBadgeCloseComponent } from "./close";
import { DemoBadgeDisabledComponent } from "./disabled";
import { DemoBadgeFillComponent } from "./fill";
import { DemoBadgeIconComponent } from "./icon";
import { DemoBadgeShapeComponent } from "./shape";
import { DemoBadgeVariantComponent } from "./variant";

export const BADGE = {
    componentName: "badge",
    componentType: "badge",
    examples: [
        {
            name: "variant",
            component: DemoBadgeVariantComponent,
        },
        {
            name: "fill",
            component: DemoBadgeFillComponent,
        },
        {
            name: "shape",
            component: DemoBadgeShapeComponent,
        },
        {
            name: "disabled",
            component: DemoBadgeDisabledComponent,
        },
        {
            name: "icon",
            component: DemoBadgeIconComponent,
        },
        {
            name: "close",
            component: DemoBadgeCloseComponent,
        },
    ],
};
