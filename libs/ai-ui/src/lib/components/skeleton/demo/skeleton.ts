import { DemoSkeletonCardComponent } from "./card";
import { DemoSkeletonChartComponent } from "./chart";
import { DemoSkeletonDefaultComponent } from "./default";

export const SKELETON = {
    componentName: "skeleton",
    examples: [
        { name: "default", component: DemoSkeletonDefaultComponent },
        { name: "chart", component: DemoSkeletonChartComponent },
        { name: "card", component: DemoSkeletonCardComponent },
    ],
};
