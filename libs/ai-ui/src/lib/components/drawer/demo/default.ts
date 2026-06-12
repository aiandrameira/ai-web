import { Component, inject, signal } from "@angular/core";
import { form, FormField } from "@angular/forms/signals";

import { AiPrint } from "../../../core";
import { AiButton } from "../../button";
import { AiInput } from "../../form-field";
import { AiToastService } from "../../toast";
import { AI_DRAWER_DATA } from "../drawer-config";
import { AiDrawerRef } from "../drawer-ref";
import { AiDrawerService } from "../drawer.service";

@Component({
    selector: "ai-demo-drawer-child",
    imports: [FormField, AiInput],
    template: `
        <div class="flex flex-col items-center gap-4">
            <ai-input class="w-full" label="Usename" maxlength="40" [formField]="userForm.username" />
            <ai-input class="w-full" label="E-amil" type="email" maxlength="120" [formField]="userForm.email" />
        </div>
    `,
})
export class DemoDrawerChildComponent {
    #drawerRef = inject(AiDrawerRef);
    protected data = inject(AI_DRAWER_DATA);

    userSchema = signal<{ username: string; email: string }>({ username: "", email: "" });

    userForm = form(this.userSchema);

    constructor() {
        if (this.data) {
            this.userSchema.set(this.data);
        }
    }

    clear() {
        console.log("Clear");
    }

    onSearch() {
        this.#drawerRef.close({
            message: "Drawer closing success.",
            data: this.userForm().value(),
        });
    }
}

@Component({
    selector: "ai-demo-drawer-default",
    imports: [AiButton, AiPrint],
    template: `
        <div class="flex flex-col gap-4">
            <ai-button class="w-max" variant="primary" icon="filter" (click)="openDrawer()"> Abrir drawer </ai-button>

            @if (dataDrawer().username !== "" || dataDrawer().email !== "") {
                <ai-print [obj]="dataDrawer()" />
            }
        </div>
    `,
})
export class DemoDrawerDefaultComponent {
    #drawerService = inject(AiDrawerService);
    #toast = inject(AiToastService);

    dataDrawer = signal<{ username: string; email: string }>({ username: "", email: "" });

    openDrawer() {
        const drawerRef = this.#drawerService.open({
            component: DemoDrawerChildComponent,
            title: "Example filter",
            icon: "filter",
            position: "right",
            confirmIcon: "search",
            confirmText: "Pesquisar",
            cancelIcon: "brush-3",
            cancelText: "Limpar",
            data: {
                username: "John Doe",
                email: "johndoe@example.com",
            },
            onCancel: child => {
                if (child) child.clear();
            },
            onConfirm: child => {
                if (child) child.onSearch();
            },
        });

        drawerRef.afterClosed().subscribe((result: { message: string; data: { username: string; email: string } }) => {
            if (!result) return;
            this.#toast.default({ message: result.message });
            this.dataDrawer.set(result.data);
        });
    }
}
