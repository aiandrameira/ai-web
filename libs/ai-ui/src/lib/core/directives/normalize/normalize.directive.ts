import { computed, Directive, ElementRef, HostListener, inject, input } from "@angular/core";
import { NgControl } from "@angular/forms";
import { AiNormalizeConfig } from "./normalize.config";
import { AiNormalizeType, NORMALIZE_STRATEGIES } from "./strategies";

@Directive({
    selector: "[normalize]",
})
export class AiNormalizeDirective {
    #elementRef = inject(ElementRef);
    #ngControl = inject(NgControl, { optional: true });

    normalize = input<AiNormalizeType>();
    normalizeConfig = input<AiNormalizeConfig | undefined>();

    #strategy = computed(() => {
        const type = this.normalize();
        return type ? NORMALIZE_STRATEGIES[type] : null;
    });

    @HostListener("input", ["$event"])
    onInput(event: Event) {
        const input = event.target as HTMLInputElement | null;
        if (!input) return;

        const strategy = this.#strategy();
        if (!strategy) return;

        const normalized = strategy.normalize(input.value, this.normalizeConfig());

        this.#elementRef.nativeElement.value = normalized;
        this.#ngControl?.control?.setValue(normalized, { emitEvent: false });
    }
}
