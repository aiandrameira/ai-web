import { Component } from "@angular/core";

import { AiBadge } from "../badge";

@Component({
    imports: [AiBadge],
    template: `
        <div class="flex items-center justify-center gap-2 flex-wrap">
            <ai-badge variant="default">default</ai-badge>
            <ai-badge variant="primary">primary</ai-badge>
            <ai-badge variant="accent">accent</ai-badge>
            <ai-badge variant="outline">outline</ai-badge>
            <ai-badge variant="destructive">destructive</ai-badge>
            <ai-badge variant="info">info</ai-badge>
            <ai-badge variant="success">success</ai-badge>
            <ai-badge variant="warning">warning</ai-badge>
        </div>
    `,
})
export class DemoBadgeVariantComponent {}
