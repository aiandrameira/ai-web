export interface StepDto {
    title: string;
    subtitle?: string;
    url?: {
        text: string;
        href: string;
        external?: boolean;
    };
    path?: string;
    file?: {
        path: string;
        lineNumber: boolean;
    };
    expandable?: boolean;
}
