import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";

import { Injectable, signal } from "@angular/core";
import { rehypeCodeTabs, rehypeEnhancedCode } from "@core/helpers";

@Injectable({
    providedIn: "root",
})
export class MarkdownService {
    #processor: any;
    #initialized = signal<boolean>(false);

    async processMarkdown(markdown: string): Promise<string> {
        await this.initializeProcessor();
        const result = await this.#processor.process(markdown);
        return result.toString();
    }

    async initializeProcessor() {
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
            })
            .use(rehypeEnhancedCode)
            .use(rehypeCodeTabs)
            .use(this._rehypeTailwindClasses())
            .use(rehypeStringify);

        this.#initialized.set(true);
    }

    private _extractTextContent(node: any): string {
        if (!node) return "";

        if (node.type === "text") return node.value || "";

        if (node.children && Array.isArray(node.children)) return node.children.map((child: any) => this._extractTextContent(child)).join("");

        return "";
    }

    private _rehypeTailwindClasses() {
        return () => {
            return (tree: any) => {
                visit(tree, "element", (node: any, index: any, parent: any) => {
                    if (node.tagName === "h1") {
                        node.properties = {
                            ...node.properties,
                            style: [],
                            class: ["text-4xl", "font-semibold", "scroll-m-20", "font-title", "tracking-tight", "sm:text-3xl", "text-primary", "xl:text-4xl", "mb-6"],
                        };
                    }

                    if (node.tagName === "h2") {
                        node.properties = {
                            ...node.properties,
                            style: [],
                            class: ["w-full", "text-base", "text-muted-foreground", "font-title", "text-primary", "font-semibold", "mb-4"],
                        };
                    }

                    if (node.tagName === "h3") {
                        node.properties = {
                            ...node.properties,
                            style: [],
                            class: ["w-full", "text-base", "text-muted-foreground", "font-title", "font-semibold", "mb-4"],
                        };
                    }

                    if (node.tagName === "p") {
                        node.properties = {
                            ...node.properties,
                            style: [],
                            class: ["text-sm", "leading-7", "font-text", "text-muted-foreground", "mb-2", "[&:not(:first-child)]:mt-6", "text-justify"],
                        };
                    }

                    if (node.tagName === "code") {
                        const isInPre = parent && parent.tagName === "pre";

                        if (!isInPre) {
                            node.properties = {
                                ...node.properties,
                                class: ["relative", "rounded", "font-code", "bg-muted", "px-[0.3rem]", "py-[0.2rem]", "text-sm", "font-bold"],
                            };
                        }
                    }

                    if (node.tagName === "hr") {
                        node.properties = {
                            ...node.properties,
                            class: ["border-t", "border-border", "my-4"],
                        };
                    }

                    if (node.tagName === "figcaption") {
                        node.properties = {
                            ...node.properties,
                            class: ["sr-only"],
                        };
                    }

                    if (node.tagName === "table" && parent) {
                        node.properties = {
                            ...node.properties,
                            class: ["w-full", "caption-bottom", "text-sm"],
                        };

                        const wrapper = {
                            type: "element",
                            tagName: "div",
                            properties: {
                                class: ["overflow-auto", "rounded-md", "border", "border-border", "my-4"],
                            },
                            children: [node],
                        };

                        parent.children[index] = wrapper;
                    }

                    if (node.tagName === "thead") {
                        node.properties = {
                            ...node.properties,
                            class: ["[&_tr]:text-primary", "bg-default"],
                        };
                    }

                    if (node.tagName === "tbody") {
                        node.properties = {
                            ...node.properties,
                            class: ["&_tr:last-child]:border-0", "bg-default/20"],
                        };
                    }

                    if (node.tagName === "tfoot") {
                        node.properties = {
                            ...node.properties,
                            class: ["border-t", "bg-muted/50", "font-medium", "font-text", "[&>tr]:last:border-b-0"],
                        };
                    }

                    if (node.tagName === "tr") {
                        node.properties = {
                            ...node.properties,
                            class: ["transition-colors", "hover:bg-muted/50"],
                        };
                    }

                    if (node.tagName === "th") {
                        node.properties = {
                            ...node.properties,
                            class: ["h-12", "px-4", "text-left", "align-middle", "font-text", "font-semibold"],
                        };
                    }

                    if (node.tagName === "td") {
                        node.properties = {
                            ...node.properties,
                            class: [
                                "p-4",
                                "align-middle",
                                "text-left",
                                "align-middle",
                                "font-medium",
                                "first:[&_code]:font-code",
                                "first:[&_code]:bg-orange-600/10",
                                "first:[&_code]:text-orange-500",
                                "[&_a>strong]:text-orange-500",
                                "[&_a>strong]:hover:underline",
                                "[&_code]:bg-primary/10",
                                "[&_code]:rounded-sm",
                                "[&_code]:border-none",
                                "[&_code]:font-code",
                                "[&_code]:font-medium",
                                "[&_code]:whitespace-nowrap",
                                "[&_code]:rounded",
                                "[&_code]:border-ring",
                                "[&_code]:border",
                                "[&_code]:bg-muted",
                                "[&_code]:text-xs",
                                "[&_code]:py-1",
                                "[&_code]:px-2",
                                "[&_code]:mx-1",
                            ],
                        };
                    }

                    if (node.tagName === "caption") {
                        node.properties = {
                            ...node.properties,
                            class: ["mt-4", "text-sm", "text-muted-foreground"],
                        };
                    }

                    if (node.tagName === "h5") {
                        node.properties = {
                            ...node.properties,
                            class: ["text-xl", "font-semibold", "mt-4", "text-primary", "font-title"],
                        };
                    }
                });
            };
        };
    }
}
