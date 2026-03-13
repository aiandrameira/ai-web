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
                path: "dark-mode",
                loadComponent: () => import("./dark-mode/dark-mode").then(m => m.DarkMode),
                title: "Ai • Dark Mode",
            },
            {
                path: "about",
                loadComponent: () => import("./about/about").then(m => m.About),
                title: "Ai • About",
            },
            {
                path: "support",
                loadComponent: () => import("./support/support").then(m => m.Support),
                title: "Ai • Support",
            },
            {
                path: ":env",
                loadComponent: () => import("./install/install").then(m => m.Install),
                title: "Ai • Install",
            },
        ],
    },
];
