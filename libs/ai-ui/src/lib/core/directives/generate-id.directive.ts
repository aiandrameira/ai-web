import { computed, Directive, inject, Injectable, input } from "@angular/core";

@Injectable({ providedIn: "root" })
class GenerateIdService {
    #counter = 0;

    generate(prefix: string) {
        return `${prefix}-${++this.#counter}`;
    }
}

@Directive({
    selector: "[aiId]",
    exportAs: "aiId",
})
export class GenerateIdDirective {
    #service = inject(GenerateIdService);

    readonly aiId = input("ssr");
    readonly id = computed(() => this.#service.generate(this.aiId()));
}
