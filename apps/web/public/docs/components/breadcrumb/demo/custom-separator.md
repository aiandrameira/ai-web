```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";
import { AiIcon } from "../../icon/icon.component";
import { AiBreadcrumbImports } from "../breadcrumb.imports";

@Component({
    imports: [AiBreadcrumbImports, AiIcon],
    template: `
        <ai-breadcrumb-content>
            <ai-breadcrumb-list>
                <ai-breadcrumb-item>
                    <ai-breadcrumb-link link="/">Home</ai-breadcrumb-link>
                </ai-breadcrumb-item>
                <ai-breadcrumb-separator>
                    <ai-icon icon="arrow-right-double" />
                </ai-breadcrumb-separator>
                <ai-breadcrumb-item>
                    <ai-breadcrumb-link link="/components">Components</ai-breadcrumb-link>
                </ai-breadcrumb-item>
                <ai-breadcrumb-separator>
                    <ai-icon icon="arrow-right-long" />
                </ai-breadcrumb-separator>
                <ai-breadcrumb-item>
                    <ai-breadcrumb-page>Breadcrumb</ai-breadcrumb-page>
                </ai-breadcrumb-item>
            </ai-breadcrumb-list>
        </ai-breadcrumb-content>
    `,
})
export class DemoBreadcrumbCustomSeparatorComponent {}
```
