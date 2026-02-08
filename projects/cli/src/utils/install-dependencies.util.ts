import { execa } from "execa";
import { getProject } from "./get-project.util";

export async function installDependencies(cwd: string) {
    const projectInfo = await getProject(cwd);

    const angularMajor = projectInfo.version ? parseInt(projectInfo.version.split(".")[0]) : 0;

    const cdkMap: Record<number, string> = {
        17: "@angular/cdk@^17.0.0",
        18: "@angular/cdk@^18.0.0",
        19: "@angular/cdk@^19.0.0",
        20: "@angular/cdk@^20.0.0",
    };

    const cdkVersion = cdkMap[angularMajor] || "@angular/cdk";

    const deps = [cdkVersion, "class-variance-authority", "clsx", "tailwind-merge"];
    const devDeps = ["tailwindcss", "@tailwindcss/postcss", "postcss", "tailwindcss-animate"];

    await installPackages(cwd, deps);
    await installPackages(cwd, devDeps, true);
}

async function installPackages(cwd: string, packages: string[], dev = false) {
    const args = dev ? ["install", "-D", ...packages] : ["install", ...packages];
    
    try {
        await execa("npm", args, { cwd });
    } catch {
        await execa("npm", 
            dev ? 
            ["install", "-D", "--legacy-peer-deps", ...packages] : 
            ["install", "--legacy-peer-deps", ...packages], { cwd }
        );
    }
}