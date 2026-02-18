import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { ScrollDirective } from "@core/directives";
import { NavigationConfigDto } from "@domain/dtos";
import { Content, Heading } from "@views/shared";

import { CardInstallation } from "../components/card-installation/card-installation";

@Component({
    selector: "ai-installation",
    imports: [Heading, Content, ScrollDirective, CardInstallation],
    templateUrl: "./installation.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Installation {
    activeSummary?: string;

    navigations = signal<NavigationConfigDto>({
        items: [{ id: "environment", label: "Environments", type: "core" }],
    });
}
