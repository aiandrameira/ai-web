import { Routes } from "@angular/router";

export const componentsRoutes: Routes = [
    {
        path: "",
        loadComponent: () => import("./component-list/component-list").then(c => c.ComponentList),
    },
    {
        path: ":componentName",
        loadComponent: () => import("./component/component").then(c => c.AiComponent),
    },
];
