import { ChangeDetectionStrategy, Component, computed, effect, inject, input, linkedSignal, OnDestroy, signal, ViewEncapsulation } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { ClipboardUtil } from "../../core";
import { AiButton } from "../button";
import { AiIcon } from "../icon/icon.component";
import { AiLoader } from "../loader";
import { AiTooltipImports } from "../tooltip";
import { faviconIconsSvg } from "./language-icons";
import { MarkdownService } from "./markdown.service";

export type AiLanguageType = "typescript" | "javascript" | "html" | "css" | "json" | "bash" | "markdown" | "java";
export type AiThemeType = "light" | "dark";

@Component({
    selector: "ai-markdown",
    exportAs: "aiMarkdown",
    imports: [AiIcon, AiButton, AiLoader, AiTooltipImports],
    templateUrl: "./markdown.html",
    styleUrl: "./markdown.scss",
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiMarkdown implements OnDestroy {
    #markdownService = inject(MarkdownService);
    #sanitizer = inject(DomSanitizer);

    readonly code = input<string>("");
    readonly language = input<AiLanguageType>("typescript");
    readonly theme = input<AiThemeType>("light");

    protected readonly loading = signal<boolean>(false);

    codeLanguage = linkedSignal(this.language);
    codeTheme = linkedSignal(this.theme);
    compiledHtml = signal<SafeHtml>("");
    copied = signal<boolean>(false);

    #previewJob = 0;
    #previewTimer: ReturnType<typeof setTimeout> | undefined;

    languageIconSvg = computed(() => {
        const lang = this.codeLanguage();
        const svg = faviconIconsSvg[lang] || faviconIconsSvg["terminal"];
        return this.#sanitizer.bypassSecurityTrustHtml(svg);
    });

    constructor() {
        this.#markdownService.prewarm().catch(() => undefined);

        effect(() => {
            this.code();
            this.codeLanguage();
            this._schedulePreviewUpdate();
        });
    }

    setTheme() {
        this.codeTheme.update(current => (current === "dark" ? "light" : "dark"));
    }

    ngOnDestroy() {
        if (this.#previewTimer) clearTimeout(this.#previewTimer);
    }

    async copyCode() {
        await ClipboardUtil.copy(this.code());
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 3000);
    }

    private _schedulePreviewUpdate(): void {
        if (this.#previewTimer) clearTimeout(this.#previewTimer);
        this.loading.set(true);

        this.#previewTimer = setTimeout(() => {
            void this._updatePreview();
        }, 200);
    }

    private async _updatePreview(): Promise<void> {
        const jobId = ++this.#previewJob;
        const content = this.code();

        if (!content) {
            this.compiledHtml.set("");
            this.loading.set(false);
            return;
        }

        try {
            const lang = this.codeLanguage();
            const isMarkdown = lang === "markdown";

            const composed = isMarkdown ? content : `\`\`\`${lang} showLineNumbers\n${content}\n\`\`\``;
            const html = await this.#markdownService.processMarkdown(composed);

            if (jobId === this.#previewJob) {
                this.compiledHtml.set(this.#sanitizer.bypassSecurityTrustHtml(html));
            }
        } catch (error) {
            console.error("Preview processing error:", error);
        } finally {
            if (jobId === this.#previewJob) {
                this.loading.set(false);
            }
        }
    }
}
