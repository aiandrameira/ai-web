export interface ProjectDto {
    framework: "angular" | "unknown";
    lgTypeScript: boolean;
    lgTailwind: boolean;
    lgNx: boolean;
    version: string | null;
}

export function makeProject(raw: Partial<ProjectDto> = {}): ProjectDto {
    return {
        framework: raw.framework ?? "angular",
        lgTypeScript: raw.lgTypeScript ?? false,
        lgTailwind: raw.lgTailwind ?? false,
        lgNx: raw.lgNx ?? false,
        version: raw.version ?? null,
        ...raw,
    };
}
