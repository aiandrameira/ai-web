import { DemoTableBorderComponent } from "./border";
import { DemoTableDefaultComponent } from "./default";
import { DemoTableSelectedComponent } from "./selected";
import { DemoTableSizeComponent } from "./size";

export const TABLE = {
    componentName: "table",
    componentType: "table",
    examples: [
        {
            name: "default",
            component: DemoTableDefaultComponent,
        },
        {
            name: "size",
            component: DemoTableSizeComponent,
        },
        {
            name: "border",
            component: DemoTableBorderComponent,
        },
        {
            name: "selected",
            component: DemoTableSelectedComponent,
        },
    ],
};
