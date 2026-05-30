import { Directive, inject, Input, TemplateRef } from "@angular/core";

@Directive({
    selector: "ng-template[aiCellTemplate]",
})
export class AiCellTemplateDirective<T = unknown> {
    @Input("aiCellTemplate") key!: string;

    template = inject(TemplateRef<{ $implicit: T }>);
}
