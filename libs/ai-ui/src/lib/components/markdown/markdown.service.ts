import { Injectable, signal } from "@angular/core";
import rehypePrettyCode, { Options } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { rehypeCodeTabs, rehypeEnhancedCode } from "./icon.helper";

const TAG_CLASSES: Record<string, string[]> = {
    h1: ["font-bold", "font-title", "tracking-tight", "scroll-m-20", "mb-6", "text-xl", "md:text-2xl", "xl:text-3xl"],
    h2: ["w-full", "text-xl", "lg:text-2xl", "font-semibold", "font-title", "scroll-m-20", "tracking-tight", "mb-4", "mt-8", "border-b", "pb-2"],
    h3: ["w-full", "text-lg", "lg:text-xl", "font-semibold", "font-title", "mb-4", "mt-6"],
    h4: ["text-base", "font-semibold", "font-title", "mb-4", "mt-6"],
    h5: ["text-sm", "font-semibold", "font-title", "mb-4", "mt-6"],
    h6: ["text-sm", "font-semibold", "font-title", "mb-4", "mt-6"],
    p: ["text-sm", "leading-7", "font-text", "[&:not(:first-child)]:mt-6"],
    a: ["font-semibold", "text-sm", "underline-offset-4", "font-text"],
    strong: ["font-bold", "font-text"],
    b: ["font-bold", "font-text"],
    ul: ["my-6", "ml-6", "list-disc", "[&>li]:mt-1"],
    ol: ["my-6", "ml-6", "list-decimal", "[&>li]:mt-1"],
    li: ["text-sm", "font-text"],
    hr: ["my-4", "border-t"],
    blockquote: ["border-l-2", "pl-4", "italic", "my-4", "py-0.5", "rounded-md"],
    table: ["w-full", "caption-bottom", "text-sm"],
    thead: ["[&_tr]:border-b"],
    tbody: ["[&_tr:last-child]:border-0"],
    tfoot: ["border-t", "font-semibold", "font-text", "[&>tr]:last:border-b-0"],
    tr: ["border-b", "transition-colors"],
    th: ["h-12", "px-4", "text-left", "align-middle", "font-semibold", "font-text"],
    td: ["p-4", "align-middle", "font-medium", "font-text"],
    caption: ["mt-4", "text-sm"],
    figcaption: ["sr-only"],
};

@Injectable({
    providedIn: "root",
})
export class MarkdownService {
    #processor: any;
    #initialized = signal<boolean>(false);

    async processMarkdown(markdownText: string): Promise<string> {
        await this.initializeProcessors();
        if (!this.#processor) return "";
        const result = await this.#processor.process(markdownText);
        return result.toString();
    }

    async prewarm(): Promise<void> {
        await this.initializeProcessors();
        if (!this.#processor) return;
        const sample = "```ts\nconst x = 1\n```";
        await this.#processor.process(sample);
    }

    async initializeProcessors(): Promise<void> {
        if (this.#initialized()) return;

        this.#processor = unified()
            .use(remarkParse, { fragment: true })
            .use(remarkGfm)
            .use(remarkRehype)
            .use(rehypeSlug)
            .use(rehypePrettyCode, {
                theme: {
                    dark: "github-dark",
                    light: "github-light",
                },
                keepBackground: false,
                defaultLang: "plaintext",
            } as Options)
            .use(rehypeEnhancedCode)
            .use(rehypeCodeTabs)
            .use(this._rehypeApplyStyles())
            .use(rehypeStringify);

        this.#initialized.set(true);
    }

    private _rehypeApplyStyles() {
        return () => (tree: any) => {
            visit(tree, "element", (node: any, index: any, parent: any) => {
                if (node.tagName === "span") {
                    const isInCode = parent && parent.tagName === "code";
                    if (isInCode) return;
                }

                if (TAG_CLASSES[node.tagName]) {
                    this._addClasses(node, TAG_CLASSES[node.tagName]);
                }

                if (node.tagName === "code") {
                    const isInPre = parent && parent.tagName === "pre";
                    if (!isInPre) {
                        this._addClasses(node, ["relative", "rounded", "px-[0.3rem]", "py-[0.2rem]", "font-code", "text-xs", "font-semibold"]);
                    }
                }

                if (node.tagName === "table" && parent) {
                    const wrapper = {
                        type: "element",
                        tagName: "div",
                        properties: { class: ["w-full", "overflow-y-auto", "rounded-md", "my-4"] },
                        children: [node],
                    };
                    parent.children[index] = wrapper;
                }
            });
        };
    }

    private _addClasses(node: any, classes: string[]) {
        node.properties = {
            ...node.properties,
            class: [...(node.properties?.class || []), ...classes],
        };
    }
}
