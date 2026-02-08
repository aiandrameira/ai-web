import { logger } from "@/helpers/logger.helper";
import * as commentJson from "comment-json";
import { existsSync } from "fs";
import fs from "fs-extra";
import path from "path";

export async function updateTsConfig(cwd: string) {
    const tsconfigPath = path.join(cwd, "tsconfig.json");

    if (!existsSync(tsconfigPath)) {
        logger.warn("tsconfig.json not found, skipping path configuration");
        return;
    }

    try {
        const tsconfigContent = await fs.readFile(tsconfigPath, "utf8");

        const tsconfig = commentJson.parse(tsconfigContent) as any;

        if (!tsconfig.compilerOptions) tsconfig.compilerOptions = {};

        if (!tsconfig.compilerOptions.baseUrl) tsconfig.compilerOptions.baseUrl = "./";

        if (!tsconfig.compilerOptions.paths) tsconfig.compilerOptions.paths = {};

        const pathMappings = {
            "@ui/*": ["src/app/core/ui/*"],
        };

        tsconfig.compilerOptions.paths = {
            ...tsconfig.compilerOptions.paths,
            ...pathMappings,
        };

        const updatedContent = commentJson.stringify(tsconfig, null, 2);
        await fs.writeFile(tsconfigPath, updatedContent, "utf8");
    } catch (error) {
        logger.warn("Failed to update tsconfig.json paths");
        logger.error(error);
    }
}
