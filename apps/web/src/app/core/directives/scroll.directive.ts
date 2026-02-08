import { ContentChildren, Directive, EventEmitter, HostListener, Output, QueryList, signal } from "@angular/core";
import { ScrollItemDirective } from "./scroll-item.directive";

@Directive({
    selector: "[scrolling]",
})
export class ScrollDirective {
    @Output() changeScroll = new EventEmitter<string>();
    @ContentChildren(ScrollItemDirective, { descendants: true }) items?: QueryList<ScrollItemDirective>;
    #currentSection = signal<string | undefined>("");

    @HostListener("window:scroll", ["$event"])
    onScroll(event: Event) {
        let currentSection: string | undefined;
        const target = event.target as Document | null;
        const scrollingElement = target?.scrollingElement;
        if (!scrollingElement) {
            return;
        }
        const scrollTop = scrollingElement.scrollTop;
        const parentOffset = 0;

        this.items?.forEach((item) => {
            if (item.elementRef.nativeElement.offsetTop - parentOffset <= scrollTop) {
                currentSection = item.scrollingItem();
            }
        });

        if (currentSection !== this.#currentSection()) {
            this.#currentSection.set(currentSection);
            this.changeScroll.emit(this.#currentSection());
        }
    }
}
