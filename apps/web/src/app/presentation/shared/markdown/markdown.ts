import { merge } from "rxjs";

import { AiLoader } from "@ai-ui/components";
import { Component, DestroyRef, inject, input, OnInit, signal } from "@angular/core";
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { MarkdownRendererService, MarkdownService } from "@infra/services";

@Component({
    selector: "ai-markdown",
    imports: [AiLoader],
    templateUrl: "./markdown.html",
})
export class Markdown implements OnInit {
    #markdownRenderer = inject(MarkdownRendererService);
    #markdown = inject(MarkdownService);
    #sanitizer = inject(DomSanitizer);
    #destroyRef = inject(DestroyRef);

    markdownUrl = input<string>("");
    markdownText = input<string>("");
    theme = input<"light" | "dark">("light");

    processedHtml = signal<SafeHtml>("");
    loading = signal<boolean>(false);
    error = signal<string | null>(null);

    constructor() {
        merge(toObservable(this.markdownUrl), toObservable(this.theme))
            .pipe(takeUntilDestroyed(this.#destroyRef))
            .subscribe(async () => {
                const url = this.markdownUrl();
                if (url) {
                    await this._loadProcessMarkdown();
                }
            });

        toObservable(this.markdownText)
            .pipe(takeUntilDestroyed(this.#destroyRef))
            .subscribe(async () => await this._processMarkdownText());
    }

    ngOnInit() {
        this._loadProcessMarkdown();
    }

    private async _loadProcessMarkdown() {
        this.loading.set(true);
        this.error.set(null);

        try {
            const markdownText = await this.#markdownRenderer.loadFromUrl(this.markdownUrl());
            const html = await this.#markdown.processMarkdown(markdownText);
            this.processedHtml.set(this.#sanitizer.bypassSecurityTrustHtml(html));
        } catch (err) {
            this.error.set((err as Error).message || (err as string));
        } finally {
            this.loading.set(false);
        }
    }

    private async _processMarkdownText(): Promise<void> {
        const markdownText = this.markdownText();
        if (markdownText) {
            this.loading.set(true);
            this.error.set(null);

            try {
                const html = await this.#markdown.processMarkdown(markdownText);
                this.processedHtml.set(this.#sanitizer.bypassSecurityTrustHtml(html));
            } catch (err) {
                this.error.set((err as Error).message || (err as string));
            } finally {
                this.loading.set(false);
            }
        }
    }
}
