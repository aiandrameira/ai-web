import { visit } from "unist-util-visit";

import { createCodeTitle, createCopyButton, createExpandableOverlay, createTabsWrapper, extractCodeContent, getIconForFile, getIconForLanguage } from "./file-icon.helper";

export function rehypeEnhancedCode() {
    return (tree: any) => {
        visit(tree, "element", (node: any, index: number | undefined, parent: any) => {
            if (index === undefined || !parent) return;
            if (node.tagName === "pre" && node.children && node.children[0]?.tagName === "code") {
                const isInTabGroup = node.properties?.["data-in-tab-group"];

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
                    const meta = codeNode.data?.meta ?? "";
                    const titleMatch = meta.match(/title="([^"]+)"/);
                    filename = titleMatch ? titleMatch[1] : null;
                }

                const originalMeta = codeNode.data?.meta ?? "";
                const hasShowLineNumbers = originalMeta.includes("showLineNumbers");
                const hasCopyButton = originalMeta.includes("copyButton");
                const hasTitle = originalMeta.includes("title");

                const expandableMatch = originalMeta.match(/expandable="([^"]+)"/);
                const isExpandable = expandableMatch && (expandableMatch[1] === "true" || expandableMatch[1] === "on");
                const expandableTitleMatch = originalMeta.match(/expandableTitle="([^"]+)"/);
                const expandableTitle = expandableMatch ? (expandableTitleMatch ? expandableTitleMatch[1] : "View Code") : null;

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
                        class: ["group", "relative", "my-6", "overflow-hidden", "rounded-lg", "border", "border-border", "bg-muted/50", isExpandable ? "h-[250px]" : ""].filter(
                            Boolean,
                        ),
                    },
                    children: [],
                };

                const codeBlockContent: any = {
                    type: "element",
                    tagName: "div",
                    properties: {
                        class: ["group", "relative", "overflow-hidden", "rounded-lg", "border", "border-border", "bg-muted/50"],
                    },
                    children: [],
                };

                if (filename || (language && icon)) {
                    const displayTitle = filename || language;
                    codeBlockContent.children.push(createCodeTitle(displayTitle, icon, hasCopyButton, codeContent));
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
                        "p-4",
                        "text-sm",
                        "[&>code]:bg-transparent",
                        "[&>code]:font-code",
                        "[&>code_span]:font-code",
                        filename || (language && icon) ? "" : "rounded-lg",
                    ].filter(Boolean),
                };

                if (isInTabGroup) return;

                codeBlockContent.children.push(node);

                if (hasCopyButton && !hasTitle) {
                    const hasDisplayTitle = !!(filename || (language && icon));
                    codeBlockContent.children.push(createCopyButton(codeContent, hasDisplayTitle));
                }

                if (isExpandable) {
                    wrapper.children = codeBlockContent.children;
                    const overlay = createExpandableOverlay(expandableTitle ?? "View Code");
                    wrapper.children.push(overlay);
                    wrapper.properties.class.push("expandable-wrapper");
                } else {
                    wrapper.children = codeBlockContent.children;
                }
                parent.children[index] = wrapper;
            }
        });
    };
}

export function rehypeCodeTabs() {
    return (tree: any) => {
        const processed = new Set<any>();

        visit(tree, "element", (node: any, index: number | undefined, parent: any) => {
            if (index === undefined || !parent || processed.has(node)) return;

            if (node.tagName === "figure" && node.properties?.["data-rehype-pretty-code-figure"] !== undefined) {
                const preNode = node.children?.find((child: any) => child.tagName === "pre");
                const codeNode = preNode?.children?.[0];

                if (!codeNode || codeNode.tagName !== "code") return;

                const meta = codeNode.data?.meta ?? "";
                const tabMatch = meta.match(/tab="([^"]+)"/);

                if (!tabMatch) return;

                const tabGroup = [node];
                const tabLabels = [tabMatch[1]];

                let nextIndex = index + 1;
                const elementsToRemove = [];

                while (nextIndex < parent.children.length) {
                    const nextNode = parent.children[nextIndex];

                    if (nextNode.tagName !== "figure") {
                        if (nextNode.type === "text" && nextNode.value?.trim() === "") {
                            elementsToRemove.push(nextIndex);
                            nextIndex++;
                            continue;
                        } else if (
                            nextNode.tagName === "p" &&
                            (!nextNode.children ||
                                nextNode.children.length === 0 ||
                                (nextNode.children.length === 1 && nextNode.children[0].type === "text" && nextNode.children[0].value?.trim() === ""))
                        ) {
                            elementsToRemove.push(nextIndex);
                            nextIndex++;
                            continue;
                        } else {
                            break;
                        }
                    }

                    if (nextNode.properties?.["data-rehype-pretty-code-figure"] === undefined) {
                        break;
                    }

                    const nextPreNode = nextNode.children?.find((child: any) => child.tagName === "pre");
                    const nextCodeNode = nextPreNode?.children?.[0];

                    if (!nextCodeNode || nextCodeNode.tagName !== "code") break;

                    const nextMeta = nextCodeNode.data?.meta ?? "";
                    const nextTabMatch = nextMeta.match(/tab="([^"]+)"/);

                    if (!nextTabMatch) break;

                    tabGroup.push(nextNode);
                    tabLabels.push(nextTabMatch[1]);
                    processed.add(nextNode);
                    nextIndex++;
                }

                if (tabGroup.length > 1 && elementsToRemove.length) {
                    for (let i = elementsToRemove.length - 1; i >= 0; i--) {
                        parent.children.splice(elementsToRemove[i], 1);
                    }
                }

                if (tabGroup.length > 1) {
                    const hasCopyButton = tabGroup.some(block => {
                        const preNode = block.children?.find((child: any) => child.tagName === "pre");
                        const codeNode = preNode?.children?.[0];
                        const meta = codeNode?.data?.meta ?? "";
                        return meta.includes("copyButton");
                    });

                    const firstCodeNode = tabGroup[0].children?.find((child: any) => child.tagName === "pre")?.children?.[0];
                    const codeClasses = firstCodeNode?.properties?.className || [];
                    const languageClass = codeClasses.find((cls: string) => cls.startsWith("language-"));
                    const language = languageClass ? languageClass.replace("language-", "") : null;
                    const icon = language ? getIconForLanguage(language) : null;

                    const tabsWrapper = createTabsWrapper(tabGroup, tabLabels, hasCopyButton, icon);

                    parent.children.splice(index, tabGroup.length, tabsWrapper);
                    processed.add(tabsWrapper);
                    return;
                }
            }
        });
    };
}
