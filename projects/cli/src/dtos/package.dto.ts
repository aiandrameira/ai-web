import { appVersion } from "@/constants/app-version.constant";

export interface PackageDto {
    name: string;
    version: string;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
}

export function makePackage(raw: Partial<PackageDto> = {}): PackageDto {
    return {
        name: "@aiandra-team/ai-ui",
        version: appVersion,
        ...raw,
    };
}
