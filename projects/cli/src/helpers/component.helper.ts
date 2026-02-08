import { ComponentDto } from "@/dtos/component.dto";

export const components: ComponentDto[] = [
    {
        name: "button",
        dependencies: ["class-variance-authority"],
        files: [
            {
                name: "button.component.ts",
                content: "",
            },
            {
                name: "button.variants.ts",
                content: "",
            },
        ],
    },
];

export function getRegistryComponent(name: string): ComponentDto | undefined {
    return components.find(component => component.name === name);
}

export function getAllComponentNames(): string[] {
    return components.map(component => component.name);
}
