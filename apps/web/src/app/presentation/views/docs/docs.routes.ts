import { Routes } from "@angular/router";

export const docsRoutes: Routes = [
    {
        path: "",
        children: [
            {
                path: "introduction",
                loadComponent: () => import("./introduction/introduction").then(m => m.Introduction),
                title: "Ai • Introduction",
            },
            {
                path: "installation",
                loadComponent: () => import("./installation/installation").then(m => m.Installation),
                title: "Ai • Installation",
            },
            {
                path: "theming",
                loadComponent: () => import("./theming/theming").then(m => m.Theming),
                title: "Ai • Theming",
            },
            {
                path: ":env",
                loadComponent: () => import("./install/install").then(m => m.Install),
                title: "Ai • Install",
            },
        ],
    },
];
