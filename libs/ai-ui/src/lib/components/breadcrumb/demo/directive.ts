import { Component } from "@angular/core";
import { AiButton } from "../../button";
import { AiBreadcrumbImports } from "../breadcrumb.imports";

@Component({
    imports: [AiBreadcrumbImports, AiButton],
    template: `
        <ai-breadcrumb-content class="flex items-center justify-between w-150">
            <ai-breadcrumb-list>
                <ai-breadcrumb-item>
                    <ai-breadcrumb-link link="/">Home</ai-breadcrumb-link>
                </ai-breadcrumb-item>
                <ai-breadcrumb-separator />
                <ai-breadcrumb-item>
                    <ai-breadcrumb-page>Breadcrumb</ai-breadcrumb-page>
                </ai-breadcrumb-item>
            </ai-breadcrumb-list>

            <ai-button variant="default" icon="filter" size="xs" />
        </ai-breadcrumb-content>
    `,
})
export class DemoBreadcrumbDirectiveComponent {}
