import { DemoAlertAccentComponent } from "./accent";
import { DemoAlertDestructiveComponent } from "./destructive";
import { DemoAlertIconComponent } from "./icon";
import { DemoAlertInfoComponent } from "./info";
import { DemoAlertPrimaryComponent } from "./primary";
import { DemoAlertSuccessComponent } from "./success";
import { DemoAlertWarningComponent } from "./warning";

export const ALERT = {
    componentName: "alert",
    componentType: "alert",
    examples: [
        { name: "primary", component: DemoAlertPrimaryComponent },
        { name: "accent", component: DemoAlertAccentComponent },
        { name: "destructive", component: DemoAlertDestructiveComponent },
        { name: "info", component: DemoAlertInfoComponent },
        { name: "success", component: DemoAlertSuccessComponent },
        { name: "warning", component: DemoAlertWarningComponent },
        { name: "icon", component: DemoAlertIconComponent },
    ],
};
