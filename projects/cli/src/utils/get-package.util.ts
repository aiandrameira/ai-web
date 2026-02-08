import { makePackage, PackageDto } from "@/dtos/package.dto";
import { logger } from "@/helpers/logger.helper";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

export async function getPackage(): Promise<PackageDto> {
    try {
        const __dirname = path.dirname(fileURLToPath(import.meta.url));

        const possiblePaths = [
            path.resolve(__dirname, "../package.json"),
            path.resolve(__dirname, "../../package.json"),
            path.resolve(__dirname, "../../../package.json"),
            path.resolve(__dirname, "../../../../node_modules/@aiandra-team/ai-ui/package.json"),
        ];

        for (const path of possiblePaths) {
            if (await fs.pathExists(path)) {
                logger.success(`📦 package.json encontrado: ${path}`);
                return await fs.readJson(path);
            }
        }

        logger.warn("⚠️ Nenhum package.json encontrado, usando fallback.");
        return makePackage();
    } catch (error) {
        logger.error("❌ Erro ao ler package.json", error);
        return makePackage();
    }
}
