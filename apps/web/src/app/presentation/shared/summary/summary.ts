import { TitleCasePipe, ViewportScroller } from "@angular/common";
import { Component, inject, input, model } from "@angular/core";
import { HyphenToSpacePipe } from "@core/pipes";
import { NavigationConfigDto } from "@domain/dtos";

@Component({
    selector: "ai-summary",
    imports: [HyphenToSpacePipe, TitleCasePipe],
    templateUrl: "./summary.html",
})
export class Summary {
    #viewportScroller = inject(ViewportScroller);

    activeSummary = model<string | undefined>();
    navigation = input<NavigationConfigDto>({ items: [] });

    hasExamplesItem = (): boolean => this.navigation().items.some(item => item.id === "examples");

    scrollToSummary(summary: string) {
        const summaryElement = document.getElementById(summary);

        if (!summaryElement) return;

        const offsetTop = summaryElement.offsetTop;
        const innerHeight = window.innerHeight;
        const offsetHeight = summaryElement.offsetHeight;
        const centerPosition = offsetTop - innerHeight / 2 + offsetHeight / 2 + 150;
        this.#viewportScroller.scrollToPosition([0, Math.max(0, centerPosition)]);
    }
}
