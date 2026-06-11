import { ChangeDetectionStrategy, Component, input, TemplateRef, viewChild, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "ai-tab",
    exportAs: "aiTab",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <ng-template>
            <ng-content />
        </ng-template>
    `,
    host: {
        style: "display: none",
    },
})
export class AiTab {
    readonly label = input.required<string>();
    readonly disabled = input(false);
    readonly content = viewChild.required(TemplateRef);
}
