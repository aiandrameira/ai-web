import { ClassValue } from "clsx";

import { NgTemplateOutlet } from "@angular/common";
import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChildren,
    ElementRef,
    input,
    OnDestroy,
    output,
    signal,
    viewChild,
    ViewEncapsulation,
} from "@angular/core";

import { mergeClasses, transform } from "../../core";
import { AiIcon } from "../icon";
import { AiTab } from "./tabs";
import { TabActivePosition, TabAlign, tabButtonVariants, tabIndicatorVariants, TabPosition, tabsGroupVariants, tabsHeaderVariants } from "./tabs.variants";

@Component({
    selector: "ai-tabs-group",
    exportAs: "aiTabsGroup",
    imports: [NgTemplateOutlet, AiIcon],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    templateUrl: "./tabs-group.html",
    styles: `
        .ai-tabs-scroll::-webkit-scrollbar {
            display: none;
        }
        .ai-tabs-scroll {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    `,
    host: {
        "[class]": "classes()",
    },
})
export class AiTabsGroup implements AfterContentInit, AfterViewInit, OnDestroy {
    readonly tabs = contentChildren(AiTab);

    readonly tabsPosition = input<TabPosition>("top");
    readonly activePosition = input<TabActivePosition>("bottom");
    readonly alignTabs = input<TabAlign>("start");
    readonly showArrows = input<boolean, string | boolean>(false, { transform });
    readonly class = input<ClassValue>("");

    readonly changeTab = output<{ index: number; label: string }>();

    readonly selectedIndex = signal(0);
    readonly canScrollLeft = signal(false);
    readonly canScrollRight = signal(false);

    private readonly hasOverflow = signal(false);
    private resizeObserver?: ResizeObserver;

    readonly scrollContainer = viewChild<ElementRef<HTMLElement>>("scrollContainer");
    readonly outerContainer = viewChild<ElementRef<HTMLElement>>("outerContainer");

    protected readonly arrowsVisible = computed(() => this.showArrows() || this.hasOverflow());

    protected readonly classes = computed(() => mergeClasses(tabsGroupVariants({ tabsPosition: this.tabsPosition() }), this.class()));
    protected readonly headerClasses = computed(() =>
        mergeClasses(tabsHeaderVariants({ tabsPosition: this.tabsPosition(), alignTabs: this.alignTabs() }), "overflow-x-auto ai-tabs-scroll flex-1 min-w-0"),
    );
    protected readonly indicatorClasses = computed(() => mergeClasses(tabIndicatorVariants({ activePosition: this.activePosition() })));

    protected tabClasses(index: number) {
        return mergeClasses(tabButtonVariants({ active: index === this.selectedIndex() }));
    }

    ngAfterContentInit() {
        const tabs = this.tabs();
        const first = tabs.findIndex(t => !t.disabled());
        if (first >= 0) {
            this.selectedIndex.set(first);
        }
    }

    ngAfterViewInit() {
        const container = this.outerContainer()?.nativeElement;
        if (container) {
            this.resizeObserver = new ResizeObserver(() => this.checkOverflow());
            this.resizeObserver.observe(container);
        }
        this.checkOverflow();
    }

    ngOnDestroy() {
        this.resizeObserver?.disconnect();
    }

    selectTab(index: number) {
        const tab = this.tabs()[index];
        if (tab && !tab.disabled()) {
            this.selectedIndex.set(index);
            this.changeTab.emit({ index, label: tab.label() });
        }
    }

    scrollLeft() {
        const el = this.scrollContainer()?.nativeElement;
        if (el) el.scrollBy({ left: -150, behavior: "smooth" });
    }

    scrollRight() {
        const el = this.scrollContainer()?.nativeElement;
        if (el) el.scrollBy({ left: 150, behavior: "smooth" });
    }

    updateScrollState() {
        const el = this.scrollContainer()?.nativeElement;
        if (!el) return;
        this.canScrollLeft.set(el.scrollLeft > 0);
        this.canScrollRight.set(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    }

    private checkOverflow() {
        const el = this.scrollContainer()?.nativeElement;
        if (!el) return;
        this.hasOverflow.set(el.scrollWidth > el.clientWidth);
        this.updateScrollState();
    }
}
