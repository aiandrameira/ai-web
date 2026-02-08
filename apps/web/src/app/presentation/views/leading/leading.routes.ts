import { Routes } from "@angular/router";

export const leadingRoutes: Routes = [
    {
        path: "",
        loadComponent: () => import("./leading").then(c => c.Leading),
    },
];
