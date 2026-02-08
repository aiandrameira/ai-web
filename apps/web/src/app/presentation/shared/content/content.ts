import { AiFloatButtonTop } from "@ai-ui/components";
import { ViewportScroller } from "@angular/common";
import { Component, inject, input, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { NavigationConfigDto } from "@domain/dtos";

import { Summary } from "../summary/summary";

@Component({
    selector: "ai-content",
    imports: [Summary, AiFloatButtonTop],
    templateUrl: "./content.html",
})
export class Content implements OnInit {
    #titleService = inject(Title);
    #viewportScroller = inject(ViewportScroller);

    title = input<string>();
    navigationConfig = input<NavigationConfigDto>();
    activeSummary = input<string>();

    ngOnInit() {
        this.#viewportScroller.scrollToPosition([0, 0]);
        this._setTitle();
    }

    private _setTitle() {
        if (!this.title()) return;
        this.#titleService.setTitle(this.title() || "AI Web");
    }
}
