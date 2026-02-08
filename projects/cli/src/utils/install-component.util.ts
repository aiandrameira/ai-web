import { ComponentDto } from "@/dtos/component.dto";
import { Config } from "@/schemas/schema";
import { existsSync } from "fs";
import fs from "fs-extra";
import path from "path";
import { fetchComponentFromGithub } from "./feth-component.util";

type ComponentType = {
    component: ComponentDto; 
    targetDir: string; 
    config: Config & { resolvedPaths: unknown }; 
    overwrite: boolean;
}

export async function installComponent({ component, targetDir, config, overwrite }: ComponentType) {
    if (!overwrite && existsSync(targetDir)) {
        throw new Error(`Component ${component.name} already exists. Use --overwrite to overwrite.`);
    }

    await fs.mkdir(targetDir, { recursive: true });

    for (const file of component.files) {
        const content = await fetchComponentFromGithub({
            pathName: component.name,
            fileName: file.name,
            config,
        });
        const filePath = path.join(targetDir, file.name);
        const fileDir = path.dirname(filePath);

        await fs.mkdir(fileDir, { recursive: true });
        await fs.writeFile(filePath, content, "utf8");
    }
}