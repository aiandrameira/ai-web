import { Component } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { AiBadge } from "../badge";

@Component({
    imports: [AiBadge, ReactiveFormsModule],
    template: `
        <div class="flex items-center justify-center">
            <ai-badge variant="default" close (closed)="onClose()">It must be of the default type</ai-badge>
        </div>
    `,
})
export class DemoBadgeCloseComponent {
    control = new FormControl<string>("", { nonNullable: true });

    onClose() {
        this.control.reset();
    }
}
