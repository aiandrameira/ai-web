import { AiCommandImports, AiDialogRef } from "@ai-ui/components";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { sidenavPaths } from "@domain/constants";

@Component({
    selector: "search-dialog",
    imports: [...AiCommandImports],
    templateUrl: "./search-dialog.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: `
        :host {
            padding: 0 !important;
        }
    `,
})
export class SearchDialog {
    #router = inject(Router);
    #dialogRef = inject(AiDialogRef);

    protected groups = sidenavPaths;

    navigate(path: unknown) {
        this.#router.navigate([path as string]);
        this.#dialogRef.close();
    }
}
