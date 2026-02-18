interface FileIconMapping {
    [key: string]: string;
}

const fileIcons: FileIconMapping = {
    "component.ts": "/img/icons/angular.svg",
    "service.ts": "/img/icons/angular.svg",
    "directive.ts": "/img/icons/angular.svg",
    "guard.ts": "/img/icons/angular.svg",
    "pipe.ts": "/img/icons/angular.svg",
    "module.ts": "/img/icons/angular.svg",

    ts: "/img/icons/typescript.svg",
    html: "/img/icons/html.svg",
    css: "/img/icons/css.svg",
    json: "/img/icons/braces.svg",
    md: "/img/icons/html.svg",
    bash: "/img/icons/terminal.svg",
    terminal: "/img/icons/terminal.svg",
};

const languageIcons: FileIconMapping = {
    typescript: "/img/icons/typescript.svg",
    javascript: "/img/icons/javascript.svg",
    html: "/img/icons/html.svg",
    css: "/img/icons/css.svg",
    json: "/img/icons/json.svg",
    bash: "/img/icons/terminal.svg",
    shell: "/img/icons/terminal.svg",
    sh: "/img/icons/terminal.svg",
    angular: "/img/icons/angular.svg",
    ts: "/img/icons/typescript.svg",
    js: "/img/icons/javascript.svg",
    markdown: "/img/icons/markdown.svg",
    md: "/img/icons/markdown.svg",
};

export function getIconForFile(filename: string): string | null {
    if (!filename) return null;

    for (const [pattern, icon] of Object.entries(fileIcons)) {
        if (pattern.includes(".") && filename.endsWith(pattern)) {
            return icon;
        }
    }

    const extension = filename.split(".").pop()?.toLowerCase();
    if (extension && fileIcons[extension]) {
        return fileIcons[extension];
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
                tagName: "img",
                properties: {
                    src: "/img/icons/clipboard.svg",
                    alt: "Copy",
                    class: ["size-4 cursor-pointer invert-0 dark:invert group-hover:scale-110 transition-transform duration-200"],
                },
                children: [],
            },
        ],
    };
}

export function createExpandableOverlay(title: string) {
    return {
        type: "element",
        tagName: "div",
        properties: {
            class: [
                "absolute",
                "top-10",
                "inset-0",
                "z-10",
                "flex",
                "items-end",
                "justify-center",
                "pb-8",
                "bg-gradient-to-t",
                "from-background",
                "via-background/95",
                "to-background/30",
                "expandable-overlay",
            ],
        },
        children: [
            {
                type: "element",
                tagName: "button",
                properties: {
                    class: [
                        "flex",
                        "cursor-pointer",
                        "items-center",
                        "gap-2",
                        "rounded-lg",
                        "border",
                        "border-border",
                        "bg-default",
                        "px-4",
                        "py-2",
                        "text-sm",
                        "font-medium",
                        "shadow-lg",
                        "hover:bg-muted",
                        "focus-visible:outline-none",
                        "focus-visible:ring-2",
                        "focus-visible:ring-ring",
                        "focus-visible:ring-offset-2",
                    ],
                    onClick: "toggleExpandableCode(this)",
                    "aria-label": `Expand ${title}`,
                },
                children: [
                    {
                        type: "text",
                        value: title,
                    },
                ],
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

export function extractCodeContent(node: any): string {
    if (node.type === "text") return node.value ?? "";
    return node.children && Array.isArray(node.children) ? node.children.map((child: any) => extractCodeContent(child)).join("") : "";
}

export function createTabsWrapper(codeBlocks: any[], tabLabels: string[], hasCopyButton: boolean, icon: string | null): any {
    const tabCodeContents = codeBlocks.map(block => {
        const codeNode = block.children?.find((child: any) => child.tagName === "pre")?.children?.[0];
        return codeNode ? extractCodeContent(codeNode) : "";
    });

    const tabButtons = tabLabels.map((label, tabIndex) => ({
        type: "element",
        tagName: "button",
        properties: {
            class: [
                "px-2",
                "py-0.5",
                "text-sm",
                "transition-colors",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-ring",
                "rounded-md",
                tabIndex === 0 ? "bg-code-tab border border-border" : "",
                tabIndex === 0 ? "text-foreground" : "text-muted-foreground",
            ].filter(Boolean),
            "data-tab": tabIndex.toString(),
            "data-code": tabCodeContents[tabIndex],
            onClick: `switchCodeTab(event, ${tabIndex})`,
        },
        children: [
            {
                type: "element",
                tagName: "span",
                properties: {
                    class: ["inline-block"],
                },
                children: [
                    {
                        type: "text",
                        value: label,
                    },
                ],
            },
        ],
    }));

    const headerChildren = [];

    if (icon?.includes("/")) {
        headerChildren.push({
            type: "element",
            tagName: "img",
            properties: {
                src: icon,
                alt: "",
                class: ["h-4", "w-4", "shrink-0", "invert-0", "dark:invert"],
            },
            children: [],
        });
    }

    headerChildren.push({
        type: "element",
        tagName: "div",
        properties: {
            class: ["flex", "items-center", "gap-1", "flex-1"],
        },
        children: tabButtons,
    });

    if (hasCopyButton) {
        headerChildren.push({
            type: "element",
            tagName: "button",
            properties: {
                class: [
                    "ml-auto",
                    "flex",
                    "h-6",
                    "w-6",
                    "items-center",
                    "justify-center",
                    "rounded-md",
                    "bg-transparent",
                    "text-muted-foreground",
                    "transition-all",
                    "duration-200",
                    "ease-in-out",
                    "hover:bg-muted",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-ring",
                    "focus-visible:ring-offset-2",
                    "text-[14px]",
                ],
                onClick: `copyTabCode(this)`,
                "aria-label": "Copy code",
                title: "Copy code",
            },
            children: [
                {
                    type: "element",
                    tagName: "img",
                    properties: {
                        src: "/img/icons/clipboard.svg",
                        alt: "Copy",
                        class: ["size-4 invert-0 dark:invert group-hover:scale-110 transition-transform duration-200"],
                    },
                    children: [],
                },
            ],
        });
    }

    const tabContents = codeBlocks.map((figureBlock, tabIndex) => {
        const preNode = figureBlock.children?.find((child: any) => child.tagName === "pre");
        if (preNode && preNode.properties) {
            preNode.properties["data-in-tab-group"] = "true";
            const existingClasses = preNode.properties.class || [];
            preNode.properties.class = [...existingClasses, "rounded-none!"];
        }

        return {
            type: "element",
            tagName: "div",
            properties: {
                class: [
                    "code-tab-content",
                    "group",
                    "relative",
                    "overflow-hidden",
                    "rounded-b-lg",
                    "[&>figure]:rounded-none",
                    "[&>figure]:border-none",
                    "[&>figure]:my-0",
                    "border",
                    "border-border",
                    tabIndex === 0 ? "block" : "hidden",
                ],
            },
            children: figureBlock.children,
        };
    });

    return {
        type: "element",
        tagName: "div",
        properties: {
            class: ["code-tabs-wrapper", "my-6", "[&>div:first-child]:px-4", "[&>div:first-child]:py-2", "bg-muted/50", "rounded-lg"],
        },
        children: [
            {
                type: "element",
                tagName: "div",
                properties: {
                    class: ["flex", "items-center", "gap-2", "border", "border-border", "border-b-0", "bg-muted/50", "rounded-t-lg"],
                },
                children: headerChildren,
            },
            ...tabContents,
        ],
    };
}
