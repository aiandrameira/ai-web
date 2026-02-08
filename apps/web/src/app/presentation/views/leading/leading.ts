import { Component, signal } from "@angular/core";
import { form, required } from "@angular/forms/signals";

@Component({
    selector: "leading",
    imports: [],
    templateUrl: "./leading.html",
})
export class Leading {
    version = "0.0.0";

    modelForm = signal<{ name: string; amount: number }>({ name: "", amount: 123 });

    formSignal = form(this.modelForm, schema => {
        required(schema.name, { message: "Este campo é obrigatório." });
    });
}
