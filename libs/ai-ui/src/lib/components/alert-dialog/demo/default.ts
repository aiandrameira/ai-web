import { Component, inject } from "@angular/core";
import { AiButton } from "../../button";
import { AiAlertDialogService } from "../alert-dialog.service";

@Component({
    imports: [AiButton],
    template: `
        <div class="w-150 flex items-center justify-center">
            <ai-button (click)="openDialogConfirm()"> Show Dialog </ai-button>
        </div>
    `,
})
export class DemoAlertDialogDefaultComponent {
    #alertDialog = inject(AiAlertDialogService);

    openDialogConfirm() {
        this.#alertDialog.confirm({
            icon: { name: "delete-bin", color: "destructive" },
            title: "Apagar usuário",
            description: "Tem certeza que deseja apagar esse usuário?",
            confirmText: "Sim",
            cancelText: "Não",
        });
    }
}
