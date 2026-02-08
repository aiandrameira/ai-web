import { Component } from "@angular/core";
import { AiBadge } from "../badge";

@Component({
    imports: [AiBadge],
    template: `
        <div class="flex items-center justify-center">
            <ai-badge disabled>disabled</ai-badge>
        </div>
    `,
})
export class DemoBadgeDisabledComponent {}
