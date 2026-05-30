import { Route } from "@angular/router";
import { Sidenav } from "@views/shared";

export const appRoutes: Route[] = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "component",
    },
    {
        path: "component",
        loadChildren: async () => (await import("./presentation/views/components/components.routes")).componentsRoutes,
        component: Sidenav,
    },
    {
        path: "docs",
        loadChildren: () => import("./presentation/views/docs/docs.routes").then(m => m.docsRoutes),
        component: Sidenav,
    },
];
