import { ComponentDto } from "@/dtos/component.dto";
import { getAllComponentNames, getRegistryComponent } from "@/helpers/component.helper";
import { logger, spinner } from "@/helpers/logger.helper";
import { getConfig, resolveConfigPaths } from "@/utils/get-config.util";
import { getProject } from "@/utils/get-project.util";
import { installComponent } from "@/utils/install-component.util";
import { Command } from "commander";
import { execa } from "execa";
import { existsSync } from "fs";
import path from "path";
import prompts from "prompts";

export const add = new Command()
    .name("add")
    .description("add a component to your project")
    .argument("[components...]", "the components to add")
    .option("-y, --yes", "skip confirmation prompt.", false)
    .option("-o, --overwrite", "overwrite existing files.", false)
    .option("-c, --cwd <cwd>", "the working directory. defaults to the current directory.", process.cwd())
    .option("-a, --all", "add all available components", false)
    .option("-p, --path <path>", "the path to add the component to.").action(async (components, options) => {
    
    const cwd = path.resolve(options.cwd);

    if (!existsSync(cwd)) {
        logger.error(`The path ${cwd} does not exist. Please try again.`);
        process.exit(1);
    }

    const config = await getConfig(cwd);
    if (!config) {
        logger.error("Configuration not found. Please run `ai init` first.");
        process.exit(1);
    }

    const projectInfo = await getProject(cwd);
    if (projectInfo.framework !== "angular") {
        logger.error("This project does not appear to be an Angular project.");
        process.exit(1);
    }

    const resolvedConfig = await resolveConfigPaths(cwd, config);

    let selectedComponents = components;

    if (options.all) {
        selectedComponents = getAllComponentNames();
    } else if (!components?.length) {
        const { components: selected } = await prompts({
            type: "multiselect",
            name: "components",
            message: "Which components would you like to add?",
            hint: "Space to select. A to toggle all. Enter to submit.",
            choices: getAllComponentNames().map(name => ({
                title: name,
                value: name,
            })),
        });

        selectedComponents = selected;
    }

    if (!selectedComponents?.length) {
        logger.warn("No components selected. Exiting.");
        process.exit(0);
    }

    const registryComponents = selectedComponents.map((name: string) => getRegistryComponent(name)).filter(Boolean) as ComponentDto[];

    if (!registryComponents.length) {
        logger.error("Selected components not found in registry.");
        process.exit(1);
    }

    const dependenciesToInstall = new Set<string>();
    const componentsToInstall: ComponentDto[] = [];

    for (const component of registryComponents) {
        componentsToInstall.push(component);

        component.dependencies?.forEach((dep: string) => dependenciesToInstall.add(dep));

        if (component.registryDependencies) {
            for (const dep of component.registryDependencies) {
                const depComponent = getRegistryComponent(dep);
                if (depComponent && !componentsToInstall.find(c => c.name === dep)) {
                    const depTargetDir = options.path ? 
                        path.resolve(cwd, options.path, dep) : 
                        path.resolve(resolvedConfig.resolvedPaths.components, dep);

                    if (!existsSync(depTargetDir)) {
                        componentsToInstall.push(depComponent);
                        depComponent.dependencies?.forEach(d => dependenciesToInstall.add(d));
                    }
                }
            }
        }
    }

    if (!options.yes) {
        const { proceed } = await prompts({
            type: "confirm",
            name: "proceed",
            message: `Ready to install ${componentsToInstall.length} component(s) and ${dependenciesToInstall.size} dependencies. Proceed?`,
            initial: true,
        });

        if (!proceed) {
            process.exit(0);
        }
    }

    if (dependenciesToInstall.size > 0) {
        const depsSpinner = spinner("Installing dependencies...").start();
        await execa("npm", ["install", ...Array.from(dependenciesToInstall)], { cwd });
        depsSpinner.succeed();
    }

    for (const component of componentsToInstall) {
        const componentSpinner = spinner(`Installing ${component.name}...`).start();

        try {
            const targetDir = options.path ? 
                path.resolve(cwd, options.path, component.name) : 
                path.resolve(resolvedConfig.resolvedPaths.components, component.name);

            await installComponent({
                component: component, targetDir, config: resolvedConfig, overwrite: options.overwrite
            });
            componentSpinner.succeed(`Added ${component.name}`);
        } catch (error) {
            componentSpinner.fail(`Failed to install ${component.name}`);
            logger.error(error);
        }
    }

    logger.break();
    logger.success("Done!");
});


