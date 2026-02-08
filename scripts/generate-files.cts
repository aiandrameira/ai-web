import * as fs from 'fs-extra';
import * as path from 'path';

let watching = false;
const componentsPath = path.resolve(__dirname, "../libs/ai-ui/src/lib/components");
const isWatchMode = process.argv.includes("--watch") || process.argv.includes("-w");

if (isWatchMode) {
    console.log("Watching files change...");
    fs.watch(componentsPath, { persistent: true, recursive: true, encoding: "utf8" }, (eventType: unknown, fileName: string | null) => {
        if (eventType != "change") return;
        if (!fileName) return;

        const skips = ["demo", "doc"];
        if (!skips.some(x => fileName.includes(x))) return;

        if (watching) return;
        watching = true;

        console.log("📂 Generating files...");

        generateFiles();

        setTimeout(() => (watching = false), 3000);
    });
} else {
    console.log("📂  Generating files...");
    generateFiles();
}

function generateFiles() {
    const componentsDir = fs.readdirSync(componentsPath);
    componentsDir.forEach((componentName: string) => {
        const componentDirPath = path.join(componentsPath, componentName);

        const skips = ["styles", "core"];
        if (skips.indexOf(componentName) !== -1) return;

        if (fs.statSync(componentDirPath).isDirectory()) {
            processDemoFolder(componentDirPath, componentName);
            copyFolder(componentDirPath, componentName, "doc");
        }
    });

    console.log("✅ Files generated with success!");

    if (!isWatchMode) {
        process.exit(0);
    }
}

function processDemoFolder(componentDirPath: string, componentName: string) {
    const frontendResourcePath = path.resolve(__dirname, "../apps/web/public");
    const demoDirPath = path.join(componentDirPath, "demo");

    if (!fs.existsSync(demoDirPath)) return;

    const demoAssetsDirPath = path.join(frontendResourcePath, `docs/components/${componentName}/demo`);

    fs.ensureDirSync(demoAssetsDirPath);

    const files = fs.readdirSync(demoDirPath);

    files.forEach((file: string) => {
        const filePath = path.join(demoDirPath, file);
        if (!file.endsWith(".ts")) return;

        if (file === `${componentName}.ts`) {
            console.log(`   ⏭️  Skipping ${componentName}/demo/${file} (main constant file)`);
            return;
        }

        const content = fs.readFileSync(filePath, "utf-8");
        const hasExportConst = /export\s+const\s+[A-Z_]+\s*=\s*{/.test(content);
        const hasComponentDecorator = /@Component/.test(content);

        if (hasExportConst && !hasComponentDecorator) {
            console.log(`   ⏭️  Skipping ${componentName}/demo/${file} (export constant)`);
            return;
        }

        const mdFileName = file.replace(".ts", ".md");
        const mdFilePath = path.join(demoAssetsDirPath, mdFileName);

        const mdContent = `\`\`\`angular-ts showLineNumbers copyButton
${content}\`\`\`
`;

        fs.writeFileSync(mdFilePath, mdContent, "utf-8");
        console.log(`   ✓ Generated ${componentName}/demo/${mdFileName}`);
    });
}

function copyFolder(componentDirPath: string, componentName: string, folderName: string) {
    const frontendResourcePath = path.resolve(__dirname, "../apps/web/public");

    const sourceDirPath = path.join(componentDirPath, folderName);
    if (!fs.existsSync(sourceDirPath)) return;

    const destDirPath = path.join(frontendResourcePath, `docs/components/${componentName}/${folderName}`);
    fs.copySync(sourceDirPath, destDirPath, { overwrite: true });
    console.log(`   ✓ Copied ${componentName}/${folderName}`);
}
