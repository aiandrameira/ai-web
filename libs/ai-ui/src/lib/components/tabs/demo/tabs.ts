import { DemoTabsAlignComponent } from "./align";
import { DemoTabsArrowsComponent } from "./arrows";
import { DemoTabsDefaultComponent } from "./default";
import { DemoTabsPositionComponent } from "./position";

export const TABS = {
    componentName: "tabs",
    examples: [
        { name: "default", component: DemoTabsDefaultComponent },
        { name: "align", component: DemoTabsAlignComponent },
        { name: "arrows", component: DemoTabsArrowsComponent },
        { name: "position", component: DemoTabsPositionComponent },
    ],
};

export { DemoTabsAlignComponent, DemoTabsArrowsComponent, DemoTabsDefaultComponent, DemoTabsPositionComponent };
