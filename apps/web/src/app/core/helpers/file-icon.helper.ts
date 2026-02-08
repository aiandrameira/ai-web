import { visit } from "unist-util-visit";

interface FileIconMapping {
    [key: string]: string;
}

export const languageIcons: FileIconMapping = {
    typescript: "./img/icons/typescript.svg",
    javascript: "./img/icons/javascript.svg",
    html: "./img/icons/html.svg",
    css: "./img/icons/css.svg",
    json: "./img/icons/json.svg",
    bash: "./img/icons/terminal.svg",
    shell: "./img/icons/terminal.svg",
    sh: "./img/icons/terminal.svg",
    angular: "./img/icons/angular.svg",
    ts: "./img/icons/typescript.svg",
    js: "./img/icons/javascript.svg",
    mardown: "./img/icons/markdown.svg",
    md: "./img/icons/markdown.svg",
};

export function getIconForFile(filename: string): string | null {
    if (!filename) return null;

    for (const [pattern, icon] of Object.entries(languageIcons)) {
        if (pattern.includes(".") && filename.endsWith(pattern)) {
            return icon;
        }
    }

    const extension = filename.split(".").pop()?.toLowerCase();
    if (extension && languageIcons[extension]) {
        return languageIcons[extension];
    }

    return null;
}

export function getIconForLanguage(language: string): string | null {
    if (!language) return null;
    return languageIcons[language.toLowerCase()] || null;
}

export function createCopyButton(codeContent: string, hasTitle = false) {
    return {
        type: "element",
        tagName: "button",
        properties: {
            type: "button",
            class: [
                hasTitle ? "" : "absolute",
                "top-3",
                hasTitle ? "" : "right-3",
                hasTitle ? "" : "z-20",
                hasTitle && "ml-auto",
                "flex",
                "h-6",
                "w-6",
                "items-center",
                "justify-center",
                "rounded-md",
                hasTitle ?? "border",
                hasTitle ? "bg-transparent" : "bg-default",
                "text-muted-foreground",
                "transition-all",
                "duration-200",
                "ease-in-out",
                "hover:bg-muted",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-ring",
                "focus-visible:ring-offset-2",
            ],
            onclick: `copyCodeToClipboard(this, \`${codeContent.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`)`,
            "aria-label": "Copy code",
            title: "Copy code",
        },
        children: [
            {
                type: "element",
                tagName: "i",
                properties: {
                    class: [
                        "ri-file-copy-line",
                        "font-normal",
                        "text-muted-foreground",
                        "hover:text-primary",
                        "cursor-pointer",
                        "hover:bg-zinc-200",
                        "dark:hover:bg-zinc-800",
                        "h-6",
                        "w-6",
                        "leading-6",
                        "rounded-full",
                    ],
                },
                children: [],
            },
        ],
    };
}

export function createCodeTitle(filename: string, icon: string | null, copyButton: boolean, codeContent: string) {
    const titleChildren = [];

    if (icon?.includes("/")) {
        titleChildren.push({
            type: "element",
            tagName: "img",
            properties: {
                src: icon,
                alt: "",
                class: ["h-4", "w-4", "shrink-0", "invert-0", "dark:invert"],
            },
            children: [],
        });
    } else {
        titleChildren.push({
            type: "element",
            tagName: "i",
            properties: {
                class: [icon, "text-base", "text-neutral-500", "dark:text-neutral-600"],
            },
            children: [],
        });
    }

    titleChildren.push({
        type: "element",
        tagName: "span",
        properties: {
            class: ["text-[13px]", "font-medium", "leading-none", "text-neutral-500"],
        },
        children: [
            {
                type: "text",
                value: filename,
            },
        ],
    });

    if (copyButton) {
        const copyButtonHtml = createCopyButton(codeContent, copyButton);
        titleChildren.push(copyButtonHtml);
    }

    return {
        type: "element",
        tagName: "div",
        properties: {
            class: [
                "flex",
                "items-center",
                "gap-2",
                "border-b",
                "border-b-border",
                "bg-muted/50",
                "px-4",
                "py-2",
                "text-sm",
                "text-muted-foreground",
                copyButton ?? "justify-between",
            ],
        },
        children: titleChildren,
    };
}

export function rehypeEnhancedCode() {
    return (tree: any) => {
        visit(tree, "element", (node: any, index: number | undefined, parent: any) => {
            if (index === undefined || !parent) return;
            if (node.tagName === "pre" && node.children && node.children[0]?.tagName === "code") {
                const codeNode = node.children[0];
                const codeContent = extractCodeContent(codeNode);

                const codeClasses = codeNode.properties?.className || [];
                const languageClass = codeClasses.find((cls: string) => cls.startsWith("language-"));
                const language = languageClass ? languageClass.replace("language-", "") : null;

                let filename = null;

                if (parent && index > 0) {
                    const prevSibling = parent.children[index - 1];
                    if (prevSibling?.tagName === "div" && prevSibling.properties?.className?.includes("rehype-code-title")) {
                        filename = extractCodeContent(prevSibling);
                        parent.children.splice(index - 1, 1);
                        index = index - 1;
                    }
                }

                if (!filename) {
                    const meta = codeNode.data?.meta || "";
                    const titleMatch = meta.match(/title="([^"]+)"/);
                    filename = titleMatch ? titleMatch[1] : null;
                }

                const originalMeta = codeNode.data?.meta || "";
                const hasShowLineNumbers = originalMeta.includes("showLineNumbers");
                const hasCopyButton = originalMeta.includes("copyButton");
                const hasTitle = originalMeta.includes("title");

                if (hasShowLineNumbers && !codeNode.properties?.["data-line-numbers"]) {
                    const codeContent = extractCodeContent(codeNode);
                    const lineCount = codeContent.split("\n").length;
                    const maxDigits = lineCount.toString().length;

                    codeNode.properties = {
                        ...codeNode.properties,
                        "data-line-numbers": "",
                        "data-line-numbers-max-digits": maxDigits.toString(),
                    };
                }

                let icon = null;
                if (filename) {
                    icon = getIconForFile(filename);
                } else if (language) {
                    icon = getIconForLanguage(language);
                }

                const wrapper: any = {
                    type: "element",
                    tagName: "div",
                    properties: {
                        class: [
                            "group",
                            "relative",
                            "my-6",
                            "font-code",
                            "overflow-hidden",
                            "rounded-lg",
                            "border",
                            "border-border",
                            "bg-neutral-200/30",
                            "dark:bg-neutral-900/40",
                        ],
                    },
                    children: [],
                };

                if (filename || (language && icon)) {
                    const displayTitle = filename || language;
                    wrapper.children.push(createCodeTitle(displayTitle, icon, hasCopyButton, codeContent));
                }

                const existingPreClasses = node.properties?.class || [];
                const existingPreProps = node.properties || {};

                node.properties = {
                    ...existingPreProps,
                    class: [
                        ...existingPreClasses,
                        "relative",
                        "overflow-x-auto",
                        "scrollbar-hide",
                        "bg-muted/30",
                        "font-code",
                        "p-4",
                        "text-sm",
                        "[&>code]:bg-transparent",
                        filename || (language && icon) ? "" : "rounded-lg",
                    ].filter(Boolean),
                };

                wrapper.children.push(node);

                if (hasCopyButton && !hasTitle) {
                    const hasTitle = !!(filename || (language && icon));
                    wrapper.children.push(createCopyButton(codeContent, hasTitle));
                }

                parent.children[index] = wrapper;
            }
        });
    };
}

export function rehypeCodeTabs() {
    return (_tree: any) => {
        // For now, let's disable automatic tab grouping and keep it simple
        // Users can use individual code blocks which work well with titles and copy buttons
        // If needed later, we can add explicit tab markup support
    };
}

function extractCodeContent(node: any): string {
    if (node.type === "text") return node.value || "";

    if (node.children && Array.isArray(node.children)) return node.children.map((child: any) => extractCodeContent(child)).join("");

    return "";
}
