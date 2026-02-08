import { DemoLoaderSizeComponent } from "./size";
import { DemoLoaderTypeComponent } from "./type";

export const LOADER = {
    componentName: "loader",
    componentType: "loader",
    examples: [
        {
            name: "type",
            component: DemoLoaderTypeComponent,
        },
        {
            name: "size",
            component: DemoLoaderSizeComponent,
        },
    ],
};
