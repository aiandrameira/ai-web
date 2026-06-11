import { Component } from "@angular/core";

import { AiIcon } from "../../icon/icon.component";
import { AiBreadcrumbImports } from "../breadcrumb.imports";

@Component({
    selector: "ai-demo-breadcrumb-default",
    imports: [AiBreadcrumbImports, AiIcon],
    template: `
        <ai-breadcrumb-content>
            <ai-breadcrumb-list wrap="wrap" [align]="'start'">
                <ai-breadcrumb-item>
                    <ai-breadcrumb-link link="/controle">
                        <ai-icon icon="contacts" />
                        Controle
                    </ai-breadcrumb-link>
                </ai-breadcrumb-item>
                <ai-breadcrumb-separator />
                <ai-breadcrumb-item>
                    <ai-breadcrumb-link link="/colaborador">Colaboradores</ai-breadcrumb-link>
                </ai-breadcrumb-item>
                <ai-breadcrumb-separator />
                <ai-breadcrumb-item>
                    <ai-breadcrumb-page>Cadastrar colaborador</ai-breadcrumb-page>
                </ai-breadcrumb-item>
            </ai-breadcrumb-list>
        </ai-breadcrumb-content>
    `,
})
export class DemoBreadcrumbDefaultComponent {}
