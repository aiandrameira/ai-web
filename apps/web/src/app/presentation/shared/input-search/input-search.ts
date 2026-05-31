import { AiButton, AiDialogService } from "@ai-ui/components";
import { ChangeDetectionStrategy, Component, HostListener, inject, ViewContainerRef } from "@angular/core";

import { SearchDialog } from "../search-dialog/search-dialog";

@Component({
    selector: "ai-input-search",
    imports: [AiButton],
    templateUrl: "./input-search.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSearch {
    #dialogService = inject(AiDialogService);
    #vcr = inject(ViewContainerRef);

    open() {
        this.#dialogService.create({
            component: SearchDialog,
            hideFooter: true,
            maskClosable: true,
            closable: false,
            viewContainerRef: this.#vcr,
            customClasses: "p-0",
        });
    }

    @HostListener("window:keydown", ["$event"])
    onKeydown(event: KeyboardEvent) {
        if ((event.metaKey || event.ctrlKey) && event.key === "k") {
            event.preventDefault();
            this.open();
        }
    }
}
