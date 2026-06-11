import { DemoTableBorderComponent } from "./border";
import { DemoTableDefaultComponent } from "./default";
import { DemoTablePaginationComponent } from "./pagination";
import { DemoTableSelectedComponent } from "./selected";
import { DemoTableSizeComponent } from "./size";
import { DemoTableSortComponent } from "./sort";

export const TABLE = {
    componentName: "table",
    componentType: "table",
    examples: [
        { name: "default", component: DemoTableDefaultComponent },
        { name: "size", component: DemoTableSizeComponent },
        { name: "border", component: DemoTableBorderComponent },
        { name: "selected", component: DemoTableSelectedComponent },
        { name: "pagination", component: DemoTablePaginationComponent },
        { name: "sort", component: DemoTableSortComponent },
    ],
};
