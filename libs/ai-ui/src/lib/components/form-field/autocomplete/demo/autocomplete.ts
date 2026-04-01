import { DemoAutocompleteDefaultComponent } from "./default";
import { DemoAutocompleteEventsComponent } from "./events";
import { DemoAutocompleteValidationComponent } from "./validation";

export const AUTOCOMPLETE = {
    componentName: "autocomplete",
    examples: [
        {
            name: "default",
            component: DemoAutocompleteDefaultComponent,
        },
        {
            name: "validation",
            component: DemoAutocompleteValidationComponent,
        },
        {
            name: "events",
            component: DemoAutocompleteEventsComponent,
        },
    ],
};
