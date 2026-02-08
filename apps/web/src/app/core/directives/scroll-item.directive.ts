import { Directive, ElementRef, HostBinding, inject, input, Input } from "@angular/core";

@Directive({
    selector: "[scrollingItem]",
})
export class ScrollItemDirective {
    public elementRef = inject(ElementRef);

    @Input() @HostBinding("class.active") active = false;

    scrollingItem = input<string>();
}
