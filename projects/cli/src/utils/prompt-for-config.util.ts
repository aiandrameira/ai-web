import { ProjectDto } from "@/dtos/project.dto";
import { Config, configCssSchema } from "@/schemas/schema";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import prompts from "prompts";

export async function promptForConfig(cwd: string, project: ProjectDto): Promise<Config> {
    const highlight = (text: string) => chalk.cyan(text);
    const warn = (text: string) => chalk.yellow(text);

    const options = await prompts([
        {
            type: "text",
            name: "tailwindCss",
            message: `Where is your ${highlight("global CSS")} file?`,
            initial: project.lgNx ? "apps/[app]/src/styles.css" : "src/styles.css",
        },
        {
            type: "text",
            name: "components",
            message: `Configure the import alias for ${highlight("components")}:`,
            initial: project.lgNx ? "libs/ui/src/lib/components" : "src/app/core/ui/components",
        },
        {
            type: "text",
            name: "helpers",
            message: `Configure the import alias for ${highlight("helpers")}:`,
            initial: project.lgNx ? "libs/ui/src/lib/core/helpers" : "src/app/core/ui/helpers",
        },
    ]);

    const cssPath = path.join(cwd, options.tailwindCss);

    if (!fs.existsSync(cssPath)) {
        console.log(warn(`File not found at ${options.tailwindCss}. Creating a new one.`));
        await fs.ensureFile(cssPath);
    }

    const existingContent = await fs.readFile(cssPath, "utf8");
    let shouldOverwrite = false;

    if (existingContent.trim().length > 0) {
        const { overwrite } = await prompts({
            type: "confirm",
            name: "overwrite",
            message: `Your file already has content. This will overwrite it with AiUI theme configuration. Continue?`,
            initial: false,
        });

        if (!overwrite) {
            throw new Error("Installation cancelled by user.");
        }
        shouldOverwrite = true;
    }

    const config = configCssSchema.parse({
        style: path.extname(cssPath).slice(1),
        tailwind: {
            css: options.tailwindCss,
            baseColor: "slate",
            cssVariables: true,
        },
        aliases: {
            components: options.components,
            utils: options.helpers,
        },
        overwrite: shouldOverwrite,
    });

    return config;
}
