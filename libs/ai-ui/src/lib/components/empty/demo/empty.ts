import { DemoEmptyAdvancedComponent } from "./advanced";
import { DemoEmptyCustomImageComponent } from "./custom-image";
import { DemoEmptyDefaultComponent } from "./default";

export const EMPTY = {
    componentName: "empty",
    componentType: "empty",
    examples: [
        { name: "default", component: DemoEmptyDefaultComponent },
        { name: "advanced", component: DemoEmptyAdvancedComponent },
        { name: "custom-image", component: DemoEmptyCustomImageComponent },
    ],
};
