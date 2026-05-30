import { Component, input } from "@angular/core";
import { ScrollItemDirective } from "@core/directives";

import { HeadingPipe } from "./heading.pipe";

@Component({
    selector: "ai-heading",
    imports: [ScrollItemDirective, HeadingPipe],
    templateUrl: "./heading.html",
})
export class Heading {
    title = input.required<string>();
    heading = input<"h1" | "h2" | "h3" | "h4" | "h5">("h1");
    description = input.required<string>();
    id = input<string>();
}
