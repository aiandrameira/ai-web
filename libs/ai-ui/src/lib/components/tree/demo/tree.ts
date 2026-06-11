import { DemoTreeDefaultComponent } from "./default";
import { DemoTreeSelectionComponent } from "./selection";

export const TREE = {
    componentName: "tree",
    componentType: "tree",
    examples: [
        { name: "default", component: DemoTreeDefaultComponent },
        { name: "selection", component: DemoTreeSelectionComponent },
    ],
};
