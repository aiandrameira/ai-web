import { visit } from "unist-util-visit";

export function rehypeComponentBadges() {
    return (tree: any) => {
        let currentType: string | null = null;

        visit(tree, "element", (node: any) => {
            const isParagraphOrHeading = node.tagName === "p" || /^h[1-6]$/.test(node.tagName);

            if (isParagraphOrHeading && node.children?.length > 0) {
                const text = node.children.map((c: any) => c.value || (c.children && c.children.map((cc: any) => cc.value).join("")) || "").join("");
                const match = text.match(/^\[(`?)([^[\]]+)\1\]\s*-?\s*(Component|Directive|Service|Pipe)$/);

                if (match) {
                    const [, , selectorClean, typeName] = match;
                    const typeLower = typeName.toLowerCase();
                    currentType = typeLower;

                    node.properties = {
                        ...node.properties,
                        class: [...(node.properties?.class || []), `api-${typeLower}`],
                    };

                    node.children = [
                        {
                            type: "element",
                            tagName: "span",
                            properties: {
                                class: ["component-selector"],
                            },
                            children: [{ type: "text", value: selectorClean }],
                        },
                        { type: "text", value: " - " },
                        {
                            type: "element",
                            tagName: "span",
                            properties: {
                                class: ["component-badge", `component-badge-${typeLower}`],
                            },
                            children: [{ type: "text", value: typeName }],
                        },
                    ];
                }
            }

            if (currentType) {
                if (node.tagName === "div" && node.children?.[0]?.tagName === "table") {
                    node.properties = {
                        ...node.properties,
                        class: [...(node.properties?.class || []), `api-table-wrapper-${currentType}`],
                    };
                    node.children[0].properties = {
                        ...node.children[0].properties,
                        class: [...(node.children[0].properties?.class || []), `api-table-${currentType}`],
                    };
                } else if (node.tagName === "table") {
                    node.properties = {
                        ...node.properties,
                        class: [...(node.properties?.class || []), `api-table-${currentType}`],
                    };
                }
            }

            if (node.tagName === "h1" || node.tagName === "h2" || node.tagName === "h5") {
                currentType = null;
            }
        });
    };
}
