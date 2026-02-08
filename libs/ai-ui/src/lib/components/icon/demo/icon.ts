import { DemoIconSearchableComponent } from "./searchable";
import { DemoIconSizeComponent } from "./size";
import { DemoIconTypeComponent } from "./type";

export const ICON = {
    componentName: "icon",
    componentType: "icon",
    examples: [
        {
            name: "searchable",
            component: DemoIconSearchableComponent,
        },
        {
            name: "size",
            component: DemoIconSizeComponent,
        },
        {
            name: "type",
            component: DemoIconTypeComponent,
        },
    ],
};
