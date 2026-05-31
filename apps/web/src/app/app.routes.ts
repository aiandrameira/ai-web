import { Route } from "@angular/router";
import { Sidenav } from "@views/shared";

export const appRoutes: Route[] = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "",
    },
    {
        path: "",
        loadChildren: () => import("./presentation/views/leading/leading.routes").then(r => r.leadingRoutes),
        title: "AiUi",
    },
    {
        path: "",
        component: Sidenav,
        children: [
            {
                path: "component",
                loadChildren: async () => (await import("./presentation/views/components/components.routes")).componentsRoutes,
            },
            {
                path: "docs",
                loadChildren: () => import("./presentation/views/docs/docs.routes").then(r => r.docsRoutes),
            },
        ],
    },
];
