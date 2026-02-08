import { makeProject, ProjectDto } from "@/dtos/project.dto";
import { packageSchema } from "@/schemas/schema";
import fs from "fs-extra";
import path from "path";

export async function getProject(cwd: string): Promise<ProjectDto> {
    const packagePath = path.join(cwd, "package.json");

    if (!(await fs.pathExists(packagePath))) {
        throw new Error("No package.json found. Please run this command in your project root.");
    }

    const packageJson = packageSchema.parse(await fs.readJson(packagePath));
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

    const angular = !!deps["@angular/core"];
    const version = deps["@angular/core"]?.replace(/[^0-9.]/g, "") || null;

    return makeProject({
        framework: angular ? "angular" : "unknown",
        lgTypeScript: !!deps["typescript"],
        lgTailwind: !!deps["tailwindcss"],
        lgNx: !!deps["nx"] || !!deps["@nx/workspace"],
        version,
    });
}
