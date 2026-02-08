import { logger } from "@/helpers/logger.helper";
import { Config, configSchema } from "@/schemas/schema";
import fs from "fs-extra";
import path from "path";

export async function getConfig(cwd: string): Promise<Config | null> {
    const configPath = path.resolve(cwd, "components.json");

    if (!(await fs.pathExists(configPath))) return null;

    try {
        const configJson = await fs.readJson(configPath);
        return configSchema.parse(configJson);
    } catch (error) {
        logger.error("Invalid configuration file");
        throw error;
    }
}

export async function resolveConfigPaths(cwd: string, config: Config) {
    return {
        ...config,
        resolvedPaths: {
            tailwindCss: path.resolve(cwd, config.tailwind.css),
            components: path.resolve(cwd, config.aliases.components),
            utils: path.resolve(cwd, config.aliases.utils),
        },
    };
}
