import { Component } from "@angular/core";

import { AiBreadcrumbImports } from "../breadcrumb.imports";

@Component({
    selector: "ai-demo-breadcrumb-content",
    imports: [AiBreadcrumbImports],
    template: `
        <ai-breadcrumb-content>
            <ai-breadcrumb-list>
                <ai-breadcrumb-item>
                    <ai-breadcrumb-link link="/">Home</ai-breadcrumb-link>
                </ai-breadcrumb-item>
                <ai-breadcrumb-separator />
                <ai-breadcrumb-item>
                    <ai-breadcrumb-link link="/components">Components</ai-breadcrumb-link>
                </ai-breadcrumb-item>
                <ai-breadcrumb-separator />
                <ai-breadcrumb-item>
                    <ai-breadcrumb-page>Breadcrumb</ai-breadcrumb-page>
                </ai-breadcrumb-item>
            </ai-breadcrumb-list>
        </ai-breadcrumb-content>
    `,
})
export class DemoBreadcrumbContentComponent {}
