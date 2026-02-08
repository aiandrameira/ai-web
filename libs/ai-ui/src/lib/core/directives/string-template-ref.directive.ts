import { ChangeDetectorRef, Directive, EmbeddedViewRef, inject, Input, OnChanges, SimpleChange, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

export class StringTemplateRefContext {
    public $implicit: unknown;
}

export function isTemplateRef<T>(value: TemplateRef<T> | unknown): value is TemplateRef<T> {
    return value instanceof TemplateRef;
}

@Directive({
    selector: "[stringTemplateRef]",
    exportAs: "stringTemplateRef"
})
export class StringTemplateRefDirective<_T = unknown> implements OnChanges {
    #viewContainer = inject(ViewContainerRef);
    #templateRef = inject(TemplateRef);
    #cdr = inject(ChangeDetectorRef);

    #embeddedViewRef: EmbeddedViewRef<unknown> | null = null;
    #context = new StringTemplateRefContext();

    @Input() stringTemplateRefContext: Record<string, unknown> | null | unknown = null;
    @Input() stringTemplateRef: TemplateRef<unknown> | unknown | null = null;

    static ngTemplateContextGuard<U>(_dir: StringTemplateRefDirective<U>, _ctx: unknown): _ctx is StringTemplateRefContext {
        return true;
    }

    ngOnChanges(changes: SimpleChanges) {
        const templateChange = changes["stringTemplateRef"];
        const contextChange = changes["stringTemplateRefContext"];

        if (!templateChange) return;
        this.#context.$implicit = templateChange.currentValue;

        const recreateView =
            (templateChange && this._hasTemplateChanged(templateChange)) ||
            (contextChange && this._hasContextShapeChanged(contextChange));

        return recreateView ? this._recreateView() : this._updateContext();
    }

    private _hasTemplateChanged(change: SimpleChange): boolean {
        return change.firstChange || isTemplateRef(change.previousValue) !== isTemplateRef(change.currentValue);
    }

    private _hasContextShapeChanged(change: SimpleChange): boolean {
        const prevKeys = Object.keys(change.previousValue || {});
        const currKeys = Object.keys(change.currentValue || {});
        return prevKeys.length !== currKeys.length || currKeys.some(k => !prevKeys.includes(k));
    }

    private _recreateView() {
        this.#viewContainer.clear();

        if (isTemplateRef(this.stringTemplateRef)) {
            this.#embeddedViewRef = this.#viewContainer.createEmbeddedView(
                this.stringTemplateRef,
                this.stringTemplateRefContext
            );
        } else {
            this.#embeddedViewRef = this.#viewContainer.createEmbeddedView(this.#templateRef, this.#context);
        }

        this.#cdr.markForCheck();
    }

    private _updateContext() {
        const newCtx = isTemplateRef(this.stringTemplateRef) ? this.stringTemplateRefContext : this.#context;
        const oldCtx = this.#embeddedViewRef?.context;

        if (newCtx && oldCtx) {
            Object.assign(oldCtx, newCtx);
            this.#cdr.markForCheck();
        }
    }
}