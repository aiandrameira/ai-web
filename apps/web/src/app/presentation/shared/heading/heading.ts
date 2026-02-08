import { Component, input } from "@angular/core";
import { ScrollItemDirective } from "@core/directives";

@Component({
    selector: "ai-heading",
    imports: [ScrollItemDirective],
    templateUrl: "./heading.html",
})
export class Heading {
    title = input.required<string>();
    description = input.required<string>();
    id = input<string>();
}
