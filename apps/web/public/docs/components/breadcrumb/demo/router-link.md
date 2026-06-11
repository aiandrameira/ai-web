```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

import { AiBreadcrumbImports } from "../breadcrumb.imports";

@Component({
    imports: [AiBreadcrumbImports, RouterLink],
    template: `
        <ai-breadcrumb-content>
            <ai-breadcrumb-list>
                <ai-breadcrumb-item>
                    <a routerLink="/">Home</a>
                </ai-breadcrumb-item>
                <ai-breadcrumb-separator />
                <ai-breadcrumb-item>
                    <a routerLink="/components">Components</a>
                </ai-breadcrumb-item>
                <ai-breadcrumb-separator />
                <ai-breadcrumb-item>
                    <ai-breadcrumb-page>Breadcrumb</ai-breadcrumb-page>
                </ai-breadcrumb-item>
            </ai-breadcrumb-list>
        </ai-breadcrumb-content>
    `,
})
export class DemoBreadcrumbRouterLinkComponent {}
```
