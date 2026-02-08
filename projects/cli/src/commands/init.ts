import { logger, spinner } from "@/helpers/logger.helper";
import { createHelpers } from "@/utils/create-helpers.util";
import { getProject } from "@/utils/get-project.util";
import { installDependencies } from "@/utils/install-dependencies.util";
import { promptForConfig } from "@/utils/prompt-for-config.util";
import { setupTailwind } from "@/utils/setup-tailwind.util";
import { updateTsConfig } from "@/utils/update-ts-config.util";
import chalk from "chalk";
import { Command } from "commander";
import { existsSync } from "fs";
import fs from "fs-extra";
import path from "path";
import prompts from "prompts";

export const init = new Command()
    .name("init")
    .description("initialize your project and install dependencies")
    .option("-y, --yes", "skip confirmation prompt.", false)
    .option("-c, --cwd <cwd>", "the working directory. defaults to the current directory.", process.cwd())
    .action(async options => {
        const cwd = path.resolve(options.cwd);

        if (!existsSync(cwd)) {
            logger.error(`The path ${cwd} does not exist. Please try again.`);
            process.exit(1);
        }

        const project = await getProject(cwd);

        if (project.framework !== "angular") {
            logger.error("This project does not appear to be an Angular project.");
            logger.error("Please run this command in an Angular project.");
            process.exit(1);
        }

        logger.info("Initializing AiUI...");
        logger.break();

        const config = await promptForConfig(cwd, project);

        if (!options.yes) {
            const { proceed } = await prompts({
                type: "confirm",
                name: "proceed",
                message: "Write configuration to components.json?",
                initial: true,
            });

            if (!proceed) process.exit(0);
        }

        const configSpinner = spinner("Writing configuration...").start();
        await fs.writeFile(path.resolve(cwd, "components.json"), JSON.stringify(config, null, 2), "utf8");
        configSpinner.succeed();

        const dependenciesSpinner = spinner("Installing dependencies...").start();
        await installDependencies(cwd);
        dependenciesSpinner.succeed();

        if (!project.lgTailwind) {
            const tailwindSpinner = spinner("Setting up Tailwind CSS...").start();
            await setupTailwind(cwd, config);
            tailwindSpinner.succeed();
        }

        const helperSppiner = spinner("Creating helpers...").start();
        await createHelpers(cwd, config);
        helperSppiner.succeed();

        const tsconfigSpinner = spinner("Updating tsconfig.json...").start();
        await updateTsConfig(cwd);
        tsconfigSpinner.succeed();

        logger.break();
        logger.success("AiUI has been initialized successfully!");
        logger.break();
        logger.info("You can now add components using:");
        logger.info(chalk.bold("  npx @ai-web/ui add [component]"));
        logger.break();
    });
