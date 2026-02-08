import { AVATAR, BADGE, BUTTON, EMPTY, ICON, SEPARATOR, TOAST } from "@ai-ui/components";
import { ComponentType } from "@angular/cdk/overlay";

export interface ExampleData {
    name: string;
    type?: string;
    column?: boolean;
    component: ComponentType<unknown>;
    demo?: boolean;
}

export interface ComponentData {
    componentName: string;
    examples: ExampleData[];
    fullWidth?: boolean;
}

const dataComponents: ComponentData[] = [AVATAR, BADGE, BUTTON, EMPTY, ICON, SEPARATOR, TOAST];
const formComponents: ComponentData[] = [];

export const components = [...dataComponents, ...formComponents];
