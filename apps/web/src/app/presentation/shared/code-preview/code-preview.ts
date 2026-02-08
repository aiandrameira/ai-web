import { AiCard } from "@ai-ui/components";
import { ComponentType } from "@angular/cdk/overlay";
import { NgComponentOutlet } from "@angular/common";
import { Component, computed, input, signal } from "@angular/core";
import { HyphenToSpacePipe } from "@core/pipes";

import { Markdown } from "../markdown/markdown";

@Component({
    selector: "ai-code-preview",
    imports: [NgComponentOutlet, Markdown, HyphenToSpacePipe, AiCard],
    templateUrl: "./code-preview.html",
})
export class CodePreview {
    component = input<string>();
    demo = input<boolean | undefined>(false);
    fullWidth = input<boolean | undefined>(false);
    column = input<boolean | undefined>(false);
    path = input<string>();
    componentType = input<ComponentType<unknown>>();

    activeTab = signal<"preview" | "code">("preview");

    markdownUrl = computed(() => {
        const pathValue = this.path();
        if (!pathValue) return "";
        return `./docs/components/${pathValue}.md`;
    });

    cardClasses = computed(() => {
        const classes = [];

        if (this.column()) classes.push("[&_ng-component]:grid");
        else classes.push("[&_ng-component]:flex");

        if (this.fullWidth()) classes.push("[&_ng-component]:w-full", "[&_div:first-child]:w-full");

        return classes.join(" ");
    });
}
