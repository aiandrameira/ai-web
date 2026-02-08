import { DemoTooltipClickComponent } from "./click";
import { DemoTooltipEventsComponent } from "./events";
import { DemoTooltipHoverComponent } from "./hover";
import { DemoTooltipPositionComponent } from "./position";

export const TOOLTIP = {
    componentName: "tooltip",
    componentType: "tooltip",
    examples: [
        {
            name: "hover",
            component: DemoTooltipHoverComponent,
        },
        {
            name: "click",
            component: DemoTooltipClickComponent,
        },
        {
            name: "position",
            component: DemoTooltipPositionComponent,
        },
        {
            name: "events",
            component: DemoTooltipEventsComponent,
        },
    ],
};
