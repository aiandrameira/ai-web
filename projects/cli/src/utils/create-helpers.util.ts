import { helpers } from "@/helpers/template.helper";
import { Config } from "@/schemas/schema";
import { existsSync } from "fs";
import fs from "fs-extra";
import path from "path";

export async function createHelpers(cwd: string, config: Config) {
    const paths = path.join(cwd, config.aliases.utils);

    if (!existsSync(paths)) {
        await fs.mkdir(paths, { recursive: true });
    }

    for (const [fileName, content] of Object.entries(helpers)) {
        const filePath = path.join(paths, `${fileName}.ts`);

        if (!existsSync(filePath)) {
            await fs.writeFile(filePath, content.trim(), "utf8");
        }
    }
}
