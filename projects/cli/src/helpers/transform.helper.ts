export function transformContent(content: string): string {
    let transformed = content;

    transformed = transformed.replace(/from ['"](\.\.\/)+core\/helpers\/merge\.helper['"]/g, `from '@core/helpers/merge.helper'`);

    transformed = transformed.replace(/from ['"]\.\.\/([\w-]+)['"]/g, `from '@shared/components/$1'`);

    transformed = transformed.replace(/import \{ ClassValue \} from ['"]class-variance-authority\/dist\/types['"]/g, `import { ClassValue } from 'clsx'`);

    transformed = transformed.replace(/import \{ ClassValue \} from ['"]class-variance-authority['"]/g, `import { ClassValue } from 'clsx'`);

    return transformed;
}
