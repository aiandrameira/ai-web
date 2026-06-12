import { DemoPopoverDefaultComponent } from "./default";
import { DemoPopoverInteractiveComponent } from "./interactive";
import { DemoPopoverPositionComponent } from "./position";

export const POPOVER = {
    componentName: "popover",
    componentType: "popover",
    examples: [
        { name: "default", component: DemoPopoverDefaultComponent },
        { name: "position", component: DemoPopoverPositionComponent },
        { name: "interactive", component: DemoPopoverInteractiveComponent },
    ],
};
