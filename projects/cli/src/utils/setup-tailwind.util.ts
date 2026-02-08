import { logger } from "@/helpers/logger.helper";
import { postcssConfig, variablesCss } from "@/helpers/template.helper";
import { Config } from "@/schemas/schema";
import { existsSync } from "fs";
import fs from "fs-extra";
import path from "path";

export async function setupTailwind(cwd: string, config: Config) {
    const postcssConfigPath = path.join(cwd, ".postcssrc.json");

    if (!existsSync(postcssConfigPath)) {
        await fs.writeFile(postcssConfigPath, postcssConfig, "utf8");
    } else {
        const existingConfig = await fs.readFile(postcssConfigPath, "utf8");
        if (!existingConfig.includes("@tailwindcss/postcss")) {
            logger.info("Updating existing .postcssrc.json for Tailwind CSS v4");
            await fs.writeFile(postcssConfigPath, postcssConfig, "utf8");
        }
    }

    const stylesPath = path.join(cwd, config.tailwind.css);
    await fs.writeFile(stylesPath, variablesCss, "utf8");
    logger.info("Applied AiUI theme configuration to your CSS file");
}
