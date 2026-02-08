export function slugify(text: string): string {
    return (text || "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\u00C0-\u017F\s-]/g, "")
        .replace(/\s+/g, "-");
}
