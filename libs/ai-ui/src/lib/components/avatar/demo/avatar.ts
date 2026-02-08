import { DemoAvatarDefaultComponent } from "./default";
import { DemoAvatarShapeComponent } from "./shape";
import { DemoAvatarSizeComponent } from "./size";
import { DemoAvatarStatusComponent } from "./status";

export const AVATAR = {
    componentName: "avatar",
    componentType: "avatar",
    examples: [
        {
            name: "default",
            component: DemoAvatarDefaultComponent,
        },
        {
            name: "size",
            component: DemoAvatarSizeComponent,
        },
        {
            name: "status",
            component: DemoAvatarStatusComponent,
        },
        {
            name: "shape",
            component: DemoAvatarShapeComponent,
        },
    ],
};
