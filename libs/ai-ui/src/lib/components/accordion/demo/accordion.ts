import { DemoAccordionDefaultComponent } from "./default";
import { DemoAccordionSingleComponent } from "./single";

export const ACCORDION = {
    componentName: "accordion",
    componentType: "accordion",
    examples: [
        { name: "default", component: DemoAccordionDefaultComponent },
        { name: "single", component: DemoAccordionSingleComponent },
    ],
};
