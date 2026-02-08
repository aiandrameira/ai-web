import { Component } from "@angular/core";
import { AiIcon } from "../../icon/icon.component";
import { AiBreadcrumbImports } from "../breadcrumb.imports";

@Component({
    imports: [AiBreadcrumbImports, AiIcon],
    template: `
        <ai-breadcrumb-content>
            <ai-breadcrumb-list wrap="wrap" [align]="'start'">
                <ai-breadcrumb-item>
                    <ai-breadcrumb-link link="/">
                        <ai-icon icon="home" />
                        Home
                    </ai-breadcrumb-link>
                </ai-breadcrumb-item>
                <ai-breadcrumb-separator />
                <ai-breadcrumb-item>
                    <ai-breadcrumb-link link="/components">
                        <ai-icon icon="function" />
                        Components
                    </ai-breadcrumb-link>
                </ai-breadcrumb-item>
                <ai-breadcrumb-separator />
                <ai-breadcrumb-item>
                    <ai-breadcrumb-page>
                        <ai-icon icon="stack" />
                        Breadcrumb
                    </ai-breadcrumb-page>
                </ai-breadcrumb-item>
            </ai-breadcrumb-list>
        </ai-breadcrumb-content>
    `,
})
export class DemoBreadcrumbIconComponent {}
