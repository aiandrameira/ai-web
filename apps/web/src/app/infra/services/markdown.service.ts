import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";

import { Injectable } from "@angular/core";
import { rehypeCodeTabs, rehypeComponentBadges, rehypeEnhancedCode } from "@core/helpers";

@Injectable({
    providedIn: "root",
})
export class MarkdownService {
    private processor: any;
    private initialized = false;

    async initializeProcessor() {
        if (this.initialized) return;

        this.processor = unified()
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
            .use(rehypeCodeTabs)
            .use(rehypeEnhancedCode)
            .use(this._rehypeTailwindClasses())
            .use(rehypeComponentBadges)
            .use(rehypeStringify);

        this.initialized = true;
    }

    async processMarkdown(markdown: string): Promise<string> {
        await this.initializeProcessor();
        const result = await this.processor.process(markdown);
        return result.toString();
    }

    private _extractTextContent(node: any): string {
        if (!node) return "";

        if (node.type === "text") return node.value || "";

        return node.children && Array.isArray(node.children) ? node.children.map((child: any) => this._extractTextContent(child)).join("") : "";
    }

    private _rehypeTailwindClasses() {
        return () => {
            return (tree: any) => {
                visit(tree, "element", (node: any, index: any, parent: any) => {
                    if (node.tagName === "h1") {
                        node.properties = {
                            ...node.properties,
                            style: [],
                            class: ["text-4xl", "font-semibold", "font-title", "text-primary", "scroll-m-20", "tracking-tight", "sm:text-3xl", "xl:text-4xl"],
                        };
                    }

                    if (node.tagName === "h2") {
                        node.properties = {
                            ...node.properties,
                            style: [],
                            class: ["scroll-m-28", "font-heading", "font-title", "text-xl", "font-medium", "tracking-tight", "[&:not(:first-child)]:mt-6"],
                        };
                    }

                    if (node.tagName === "h3") {
                        node.properties = {
                            ...node.properties,
                            style: [],
                            class: ["w-full", "text-base", "my-4", "text-primary/75", "font-title", "font-semibold"],
                        };
                    }

                    if (node.tagName === "p") {
                        node.properties = {
                            ...node.properties,
                            style: [],
                            class: ["text-base", "leading-7", "text-muted-foreground", "font-text", "text-justify", "[&:not(:first-child)]:mt-6"],
                        };
                    }

                    if (node.tagName === "ul") {
                        node.properties = {
                            ...node.properties,
                            class: ["list-disc", "font-text"],
                        };
                    }

                    if (node.tagName === "hr") {
                        node.properties = {
                            ...node.properties,
                            class: ["border-t-border"],
                        };
                    }

                    if (node.tagName === "code") {
                        const isInPre = parent && parent.tagName === "pre";

                        if (!isInPre) {
                            node.properties = {
                                ...node.properties,
                                class: ["relative", "rounded", "bg-muted", "px-[0.3rem]", "py-[0.2rem]", "font-code", "text-sm", "font-semibold"],
                            };
                        }
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
                            class: ["[&_tr]:text-primary", "dark:bg-[oklch(26.9%_0_0)]", "bg-[oklch(97%_0_0)]"],
                        };
                    }

                    if (node.tagName === "tbody") {
                        node.properties = {
                            ...node.properties,
                            class: ["&_tr:last-child]:border-0", "bg-pimary/20"],
                        };
                    }

                    if (node.tagName === "tfoot") {
                        node.properties = {
                            ...node.properties,
                            class: ["border-t", "border-border", "bg-muted/50", "font-medium", "[&>tr]:last:border-b-0"],
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
                            class: ["h-12", "px-4", "text-left", "align-middle", "font-medium;"],
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
                                "[&_code]:font-code",
                                "[&_code]:rounded-sm",
                                "[&_code]:border-none",
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
                            class: ["text-xl", "font-semibold", "mt-4", "text-primary"],
                        };
                    }

                    if (node.tagName === "blockquote") {
                        node.properties = {
                            ...node.properties,
                            style: [],
                            class: ["border-l-4", "border-primary", "pl-4", "py-2", "my-4", "rounded-md", "text-muted-foreground", "[&>p]:text-sm", "italic"],
                        };
                    }

                    if (node.tagName === "a") {
                        node.properties = {
                            ...node.properties,
                            style: [],
                            class: ["text-primary", "hover:text-primary/80", "transition-colors", "font-medium"],
                        };
                    }
                });
            };
        };
    }
}
