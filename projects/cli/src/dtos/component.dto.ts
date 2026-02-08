interface FileDto {
    name: string;
    content: string;
}

export interface ComponentDto {
    name: string;
    dependencies?: string[];
    devDependencies?: string[];
    registryDependencies?: string[];
    files: FileDto[];
}
