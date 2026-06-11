import z from "zod";

import { AfterViewInit, Component, inject, signal } from "@angular/core";
import { form, FormField, validateStandardSchema } from "@angular/forms/signals";

import { AiButton } from "../../button";
import { AiInput, AiSelectImports } from "../../form-field";
import { AI_DIALOG_DATA, AiDialogService } from "../dialog.service";

export const userSchema = z.object({
    name: z.string(),
    email: z.email(),
    skill: z.string(),
});

export type UserDto = z.infer<typeof userSchema>;

@Component({
    selector: "ai-demo-dialog-default-form",
    imports: [FormField, AiInput, AiSelectImports],
    template: `
        <form class="w-full flex flex-col gap-y-4">
            <ai-input class="w-full" label="Name" [formField]="userForm.name" />
            <ai-input class="w-full" type="email" label="E-mail" [formField]="userForm.email" />

            <ai-select class="w-full" placeholder="selected skills" [formField]="userForm.skill">
                @for (item of skills(); track item) {
                    <ng-container>
                        <ai-select-item [value]="item">{{ item }}</ai-select-item>
                    </ng-container>
                }
            </ai-select>

            <div class="flex items-center justify-end"></div>
        </form>
    `,
})
export class DemoDialogDefaultFormComponent implements AfterViewInit {
    protected data: UserDto = inject(AI_DIALOG_DATA) as UserDto;

    user = signal<UserDto>({
        name: "",
        email: "",
        skill: "",
    });

    skills = signal<string[]>(["Angular", "TypeScript", "Nestjs", "Docker"]);

    userForm = form(this.user, schema => {
        validateStandardSchema(schema, userSchema);
    });

    ngAfterViewInit() {
        if (this.data) {
            this.user.set(this.data as UserDto);
        }
    }
}

@Component({
    selector: "ai-demo-dialog-default",
    imports: [AiButton],
    template: `
        <div class="w-150 flex items-center justify-center">
            <ai-button (click)="openDialog()">Edit user</ai-button>
        </div>
    `,
})
export class DemoDialogDefaultComponent {
    #dialogService = inject(AiDialogService);

    openDialog() {
        this.#dialogService.create({
            component: DemoDialogDefaultFormComponent,
            title: "Update User",
            description: "Update user information",
            data: {
                name: "John Doe",
                email: "johndoe@example.com",
                skill: "Angular",
            } as UserDto,
            width: "425px",
            confirmText: "Save",
            onConfirm: instance => {
                console.log("Confirmed with data:", instance.user());
            },
        });
    }
}
