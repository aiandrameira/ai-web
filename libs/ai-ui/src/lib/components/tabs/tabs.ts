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
    TemplateRef,
    viewChild,
    ViewEncapsulation,
} from "@angular/core";

import { mergeClasses, transform } from "../../core";
import { AiIcon } from "../icon";
import { TabActivePosition, TabAlign, tabButtonVariants, tabIndicatorVariants, TabPosition, tabsGroupVariants, tabsHeaderVariants } from "./tabs.variants";

@Component({
    selector: "ai-tab",
    exportAs: "aiTab",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <ng-template>
            <ng-content />
        </ng-template>
    `,
    host: {
        style: "display: none",
    },
})
export class AiTab {
    readonly label = input.required<string>();
    readonly disabled = input(false);
    readonly content = viewChild.required(TemplateRef);
}

@Component({
    selector: "ai-tabs-group",
    exportAs: "aiTabsGroup",
    imports: [NgTemplateOutlet, AiIcon],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styles: `
        .ai-tabs-scroll::-webkit-scrollbar {
            display: none;
        }
        .ai-tabs-scroll {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    `,
    template: `
        <div #outerContainer class="flex items-center w-full relative">
            @if (arrowsVisible()) {
                <button
                    type="button"
                    class="shrink-0 flex items-center justify-center size-8 cursor-pointer text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:pointer-events-none"
                    [disabled]="!canScrollLeft()"
                    (click)="scrollLeft()"
                >
                    <ai-icon icon="arrow-left-s" size="sm" />
                </button>
            }
            <div #scrollContainer [class]="headerClasses()" (scroll)="updateScrollState()">
                @for (tab of tabs(); track $index) {
                    <button type="button" [class]="tabClasses($index)" [disabled]="tab.disabled()" (click)="selectTab($index)">
                        {{ tab.label() }}
                        @if ($index === selectedIndex()) {
                            <span [class]="indicatorClasses()"></span>
                        }
                    </button>
                }
            </div>
            @if (arrowsVisible()) {
                <button
                    type="button"
                    class="shrink-0 flex items-center justify-center size-8 cursor-pointer text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:pointer-events-none"
                    [disabled]="!canScrollRight()"
                    (click)="scrollRight()"
                >
                    <ai-icon icon="arrow-right-s" size="sm" />
                </button>
            }
        </div>
        <div class="flex-1 min-h-0">
            @for (tab of tabs(); track $index) {
                <div [style.display]="$index === selectedIndex() ? 'block' : 'none'" class="p-4">
                    <ng-container [ngTemplateOutlet]="tab.content()" />
                </div>
            }
        </div>
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
