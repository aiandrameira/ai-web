import { ClassValue } from "clsx";
import { basicSetup } from "codemirror";
import { tomorrow } from "thememirror";

import { CommonModule, NgClass } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    ElementRef,
    inject,
    input,
    linkedSignal,
    OnDestroy,
    output,
    signal,
    viewChild,
    ViewEncapsulation,
} from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";
import { Compartment, EditorState, Extension } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";

import { ClipboardUtil } from "../../core";
import { AiButton } from "../button";
import { AiSelectImports } from "../form-field";
import { AiIcon } from "../icon/icon.component";
import { AiLoader } from "../loader";
import { AiTooltipImports } from "../tooltip";
import { faviconIconsSvg } from "./language-icons";
import { MarkdownService } from "./markdown.service";

export type AiLanguageType = "typescript" | "javascript" | "html" | "css" | "json" | "bash" | "markdown" | "java";
export type AiThemeType = "light" | "dark";

export type languageIcon = {
    language: AiLanguageType;
    icon: string;
};

@Component({
    selector: "ai-markdown",
    exportAs: "aiMarkdown",
    imports: [CommonModule, AiIcon, AiButton, AiLoader, AiSelectImports, NgClass, AiTooltipImports],
    templateUrl: "./markdown.html",
    styleUrl: "./markdown.scss",
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiMarkdown implements OnDestroy {
    #markdownService = inject(MarkdownService);
    #sanitizer = inject(DomSanitizer);

    readonly mode = input<"editor" | "viewer">("editor");
    readonly code = input<string>("");
    readonly language = input<AiLanguageType>("typescript");
    readonly theme = input<AiThemeType>("light");
    readonly class = input<ClassValue>("");

    protected readonly tab = signal<"code" | "preview">("code");
    protected readonly loading = signal<boolean>(false);

    languages = signal<AiLanguageType[]>(["typescript", "javascript", "java", "html", "css", "markdown", "bash", "json"]);
    themes = signal<AiThemeType[]>(["light", "dark"]);

    codeLanguage = linkedSignal(this.language);
    codeTheme = linkedSignal(this.theme);
    currentCode = linkedSignal(this.code);
    compiledHtml = signal<SafeHtml>("");
    copied = signal<boolean>(false);

    #editor = signal<EditorView | undefined>(undefined);
    #languageCompartment = new Compartment();
    #themeCompartment = new Compartment();
    #readOnlyCompartment = new Compartment();

    editorContainer = viewChild<ElementRef<HTMLElement>>("editorContainer");
    changeCode = output<string>();

    #previewJob = 0;
    #previewTimer: any = null;

    languageIconSvg = computed(() => {
        const lang = this.codeLanguage();
        const svg = faviconIconsSvg[lang] || faviconIconsSvg["terminal"];
        return this.#sanitizer.bypassSecurityTrustHtml(svg);
    });

    constructor() {
        this.#markdownService.prewarm().catch(() => undefined);

        effect(() => {
            const container = this.editorContainer()?.nativeElement;
            const mode = this.mode();
            const tab = this.tab();

            if (mode === "editor" && tab === "code" && container && !this.#editor()) {
                this._createEditor(container);
            }

            const editor = this.#editor();
            if (editor) {
                const lang = this.codeLanguage();
                const theme = this.codeTheme();
                const isReadOnly = mode === "viewer" || tab === "preview";

                editor.dispatch({
                    effects: [
                        this.#languageCompartment.reconfigure(this._getLanguageExtension(lang)),
                        this.#themeCompartment.reconfigure(this._getThemeExtension(theme)),
                        this.#readOnlyCompartment.reconfigure(this._getReadOnlyExtension(isReadOnly)),
                    ],
                });
            }
        });

        effect(() => {
            const mode = this.mode();
            const tab = this.tab();

            if (mode === "viewer" || (mode === "editor" && tab === "preview")) {
                this._schedulePreviewUpdate();
            }
        });
    }

    setLanguage(item: AiLanguageType) {
        this.codeLanguage.set(item);
    }

    setTheme() {
        this.codeTheme.update(current => (current === "dark" ? "light" : "dark"));
    }

    setTab(tab: "code" | "preview") {
        this.tab.set(tab);
    }

    clearCode() {
        const editor = this.#editor();
        if (editor) {
            editor.dispatch({
                changes: { from: 0, to: editor.state.doc.length, insert: "" },
            });
        }
        this.currentCode.set("");
        this.changeCode.emit("");
    }

    ngOnDestroy() {
        this.#editor()?.destroy();
        clearTimeout(this.#previewTimer);
    }

    async copyCode() {
        const code = this.#editor()?.state.doc.toString() || this.code();
        await ClipboardUtil.copy(code);
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 3000);
    }

    private _createEditor(container: HTMLElement) {
        const editor = new EditorView({
            doc: this.currentCode(),
            extensions: [
                basicSetup,
                this.#languageCompartment.of(this._getLanguageExtension(this.codeLanguage())),
                this.#themeCompartment.of(this._getThemeExtension(this.codeTheme())),
                this.#readOnlyCompartment.of(this._getReadOnlyExtension(this.mode() === "viewer")),
                EditorView.updateListener.of(item => {
                    if (item.docChanged) {
                        const newCode = item.state.doc.toString();
                        this.currentCode.set(newCode);
                        this.changeCode.emit(newCode);
                    }
                }),
                EditorView.lineWrapping,
            ],
            parent: container,
        });
        this.#editor.set(editor);
    }

    private _getLanguageExtension(lang: AiLanguageType): Extension {
        const extensions: Record<AiLanguageType, () => Extension> = {
            typescript: () => javascript({ typescript: true }),
            javascript: () => javascript(),
            java: () => java(),
            html: () => html(),
            css: () => css(),
            markdown: () => markdown(),
            bash: () => javascript(),
            json: () => json(),
        };
        return (extensions[lang] || extensions["javascript"])();
    }

    private _getThemeExtension(theme: AiThemeType): Extension[] {
        const baseTheme = EditorView.theme({
            "&": {
                fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
                fontSize: "0.75rem",
            },
            ".cm-scroller": {
                fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
                fontSize: "0.75rem",
            },
        });

        return theme === "dark" ? [baseTheme, oneDark] : [baseTheme, tomorrow];
    }

    private _getReadOnlyExtension(isReadOnly: boolean): Extension[] {
        return [EditorState.readOnly.of(isReadOnly), EditorView.editable.of(!isReadOnly)];
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
        const content = this.currentCode() || this.code();

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
