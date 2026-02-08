import { GITHUB_API, GITHUB_RAW, GITHUB_TOKEN } from "@/constants/github.constant";
import { logger } from "@/helpers/logger.helper";
import { transformContent } from "@/helpers/transform.helper";
import { Config } from "@/schemas/schema";
import { execa } from "execa";

type FetchComponent = {
    pathName: string;
    fileName: string;
    config: Config;
};

async function fetchFromGitHubAPI(filePath: string): Promise<string> {
    try {
        const apiUrl = `${GITHUB_API}/${filePath}`;

        const headers = ["-H", "Accept: application/vnd.github.v3+json", "-H", "User-Agent: ai-cli", ...(GITHUB_TOKEN ? ["-H", `Authorization: token ${GITHUB_TOKEN}`] : [])];
        const { stdout } = await execa("curl", ["-s", ...headers, apiUrl]);

        const response = JSON.parse(stdout);

        if (response.message) {
            throw new Error(response.message);
        }

        if (response.content && response.encoding === "base64") {
            return Buffer.from(response.content, "base64").toString("utf8");
        }

        throw new Error("Invalid response from GitHub API");
    } catch (error) {
        await new Promise(resolve => setTimeout(resolve, 3000));

        const rawUrl = `${GITHUB_RAW}/${filePath}`;

        const rawHeaders = ["-H", `User-Agent: ai-cli`, ...(GITHUB_TOKEN ? ["-H", `Authorization: token ${GITHUB_TOKEN}`] : [])];
        const { stdout } = await execa("curl", ["-s", "-L", ...rawHeaders, rawUrl]);

        if (!stdout || stdout.includes("429: Too Many Requests") || stdout.includes("404: Not Found")) {
            throw new Error(`Failed to fetch from both API and raw URL: ${filePath}`);
        }

        logger.error("❌ Error: ", error);
        return stdout;
    }
}

export async function fetchComponentFromGithub({ pathName, fileName }: FetchComponent): Promise<string> {
    try {
        const filePath = `libs/ai-ui/src/lib/components/${pathName}/${fileName}`;

        const delay = Math.random() * 2000 + 1000;
        await new Promise(resolve => setTimeout(resolve, delay));

        return transformContent(await fetchFromGitHubAPI(filePath));
    } catch (error) {
        throw new Error(`Failed to fetch component ${pathName}/${fileName}: ${error}`);
    }
}
