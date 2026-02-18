import { Routes } from "@angular/router";

export const docsRoutes: Routes = [
    {
        path: "",
        children: [
            {
                path: "installation",
                loadComponent: () => import("./installation/installation").then(m => m.Installation),
                title: "Ai • Installation",
            },
            {
                path: ":env",
                loadComponent: () => import("./install/install").then(m => m.Install),
                title: "Ai • Install",
            },
        ],
    },
];
