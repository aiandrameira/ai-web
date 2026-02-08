
export const helpers = {
    mergeClasses: `import { twMerge } from 'tailwind-merge';
import { ClassValue, clsx } from 'clsx';

export function mergeClasses(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function transform(value: boolean | string): boolean {
    return typeof value === 'string' ? value === '' : value;
}`,
};

export const postcssConfig = `{
    "plugins": {
        "@tailwindcss/postcss": {}
    }
}
`;

export const variablesCss = `@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

:root {
    --text: "Nunito Sans", sans-serif;
    --title: "Lexend", sans-serif;
    --background: #ffffff;
    --foreground: #0a0a0a;
    --text-foreground: #504b4b;
    --primary: #0e1026;
    --accent: #08c2b6;
    --ghost: #f5f5f5;
    --accent-foreground: #ffffff;
    --primary-foreground: #ffffff;
    --ghost-foreground: #737373;
    --warning: #f08800;
    --success: #15803d;
    --info: #1d4ed8;
    --destructive: #e7000b;
    --border: #e5e5e5;
    --input: #e5e5e5;
    --ring: #a1a1a1;
    --radius: 0.5rem;
}

.dark {
    --background: #0a0a0a;
    --foreground: #fafafa;
    --text-foreground: #aba4a4;
    --primary: #34aad9;
    --accent: #08c2b6;
    --ghost: #262626;
    --primary-foreground: #fff;
    --accent-foreground: #fff;
    --ghost-foreground: #a1a1a1;
    --warning: #f08800;
    --success: #15803d;
    --info: #1d4ed8;
    --destructive: #82181a;
    --border: #262626;
    --input: #262626;
    --ring: #525252;
}

@theme inline {
    --font-text: var(--text);
    --font-title: var(--title);
    --color-background: var(--background);
    --color-foreground: var(--foreground);
    --color-text-foreground: var(--text-foreground);
    --color-primary: var(--primary);
    --color-accent: var(--accent);
    --color-ghost: var(--ghost);
    --color-primary-foreground: var(--primary-foreground);
    --color-accent-foreground: var(--accent-foreground);
    --color-ghost-foreground: var(--ghost-foreground);
    --color-warning: var(--warning);
    --color-success: var(--success);
    --color-info: var(--info);
    --color-destructive: var(--destructive);
    --color-border: var(--border);
    --color-input: var(--input);
    --color-ring: var(--ring);
}
`;
