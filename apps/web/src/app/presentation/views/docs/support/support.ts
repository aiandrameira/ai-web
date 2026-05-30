import { AiBadge, AiCellTemplateDirective, AiIcon, AiTable, AiTableColumn, AiTableConfig, AiTooltipModule } from "@ai-ui/components";
import { ChangeDetectionStrategy, Component, computed, signal } from "@angular/core";
import { ScrollDirective, ScrollItemDirective } from "@core/directives";
import { NavigationConfigDto } from "@domain/dtos";
import { Content, Heading } from "@views/shared";

import { StatusBadgePipe } from "./status.pipe";

interface iVersion {
    version: string;
    status: "active" | "deprecated" | "archived";
    notes?: string;
}

const COLUMNS: AiTableColumn<iVersion>[] = [
    { key: "version", label: "Versão" },
    { key: "status", label: "Status" },
    { key: "notes", label: "Notas" },
];

const VERSIONS: iVersion[] = [{ version: "21.0", status: "active", notes: "Última versão estável com suporte completo a novos recursos e melhorias." }];

@Component({
    selector: "ai-support",
    imports: [Heading, Content, ScrollDirective, ScrollItemDirective, AiTooltipModule, AiBadge, AiTable, AiCellTemplateDirective, StatusBadgePipe, AiIcon],
    templateUrl: "./support.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Support {
    activeSummary?: string;

    navigations = signal<NavigationConfigDto>({
        items: [
            { id: "overview", label: "Nesta página", type: "core" },
            { id: "policy", label: "Política", type: "core" },
            { id: "status", label: "Status", type: "core" },
            { id: "upgrade", label: "Atualizações", type: "core" },
        ],
    });

    columns = signal<AiTableColumn<iVersion>[]>(COLUMNS);
    data = signal<iVersion[]>(VERSIONS);

    config = computed<AiTableConfig<iVersion>>(() => ({ columns: this.columns(), data: this.data() }));
}
