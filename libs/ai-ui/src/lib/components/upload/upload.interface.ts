export interface AiFileUpload<T = unknown> {
    file?: File;
    name: string;
    base64: string;
    value?: T | null;
    size?: string | number;
    disabled?: boolean;
}
