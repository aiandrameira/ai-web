import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { componentsPath } from "@domain/constants";
import { Content, Heading } from "@views/shared";

@Component({
    selector: "ai-component-list",
    imports: [Content, Heading, RouterLink],
    templateUrl: "./component-list.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentList {
    protected components = [...componentsPath.data];
}
