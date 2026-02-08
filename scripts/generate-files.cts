import * as fs from 'fs-extra';
import * as path from 'path';

// Constants
const COMPONENTS_PATH = path.resolve(__dirname, "../libs/ai-ui/src/lib/components");
const FRONTEND_RESOURCE_PATH = path.resolve(__dirname, "../apps/web/public");
const WATCH_DEBOUNCE_MS = 3000;

const SKIP_FOLDERS = ["demo", "doc", "interfaces", "services"];
const SKIP_ROOT_ITEMS = ["styles", "core", "index.ts"];
const PARENT_FOLDERS_TO_FLATTEN = ["form-field"];

let watching = false;
const isWatchMode = process.argv.includes("--watch") || process.argv.includes("-w");

if (isWatchMode) {
    console.log("Watching files change...");
    setupWatcher();
} else {
    console.log("📂  Generating files...");
    generateFiles();
}

function setupWatcher(): void {
    fs.watch(
        COMPONENTS_PATH, 
        { persistent: true, recursive: true, encoding: "utf8" }, 
        (eventType: unknown, fileName: string | null) => {
            if (eventType !== "change" || !fileName) return;
            if (!SKIP_FOLDERS.some(folder => fileName.includes(folder))) return;
            if (watching) return;

            watching = true;
            console.log("📂 Generating files...");
            generateFiles();
            setTimeout(() => (watching = false), WATCH_DEBOUNCE_MS);
        }
    );
}

function generateFiles(): void {
    const componentsDir = fs.readdirSync(COMPONENTS_PATH);
    
    for (const componentName of componentsDir) {
        if (shouldSkipRootItem(componentName)) continue;

        const componentDirPath = path.join(COMPONENTS_PATH, componentName);
        
        if (fs.statSync(componentDirPath).isDirectory()) {
            processComponent(componentDirPath, componentName);
        }
    }

    console.log("✅ Files generated with success!");

    if (!isWatchMode) {
        process.exit(0);
    }
}

function shouldSkipRootItem(itemName: string): boolean {
    return SKIP_ROOT_ITEMS.includes(itemName);
}

function processComponent(
    componentDirPath: string, 
    componentName: string, 
    parentPath = ""
): void {
    const fullComponentName = buildFullComponentName(parentPath, componentName);
    const outputComponentName = getOutputComponentName(parentPath, componentName);
    
    processDemoFolder(componentDirPath, fullComponentName, outputComponentName);
    copyDocFolder(componentDirPath, fullComponentName, outputComponentName);
    processSubComponents(componentDirPath, fullComponentName);
}

function buildFullComponentName(parentPath: string, componentName: string): string {
    return parentPath ? `${parentPath}/${componentName}` : componentName;
}

function getOutputComponentName(parentPath: string, componentName: string): string {
    if (parentPath && shouldFlattenParent(parentPath)) {
        return componentName;
    }
    return buildFullComponentName(parentPath, componentName);
}

function shouldFlattenParent(parentPath: string): boolean {
    return PARENT_FOLDERS_TO_FLATTEN.some(folder => parentPath.includes(folder));
}

function processSubComponents(componentDirPath: string, fullComponentName: string): void {
    const items = fs.readdirSync(componentDirPath);
    
    for (const itemName of items) {
        if (shouldSkipSubItem(itemName)) continue;

        const itemPath = path.join(componentDirPath, itemName);
        
        if (fs.statSync(itemPath).isDirectory()) {
            processComponent(itemPath, itemName, fullComponentName);
        }
    }
}

function shouldSkipSubItem(itemName: string): boolean {
    return SKIP_FOLDERS.includes(itemName) || 
           itemName.endsWith(".ts") || 
           itemName.endsWith(".html");
}

function processDemoFolder(
    componentDirPath: string, 
    fullComponentName: string,
    outputComponentName: string
): void {
    const demoDirPath = path.join(componentDirPath, "demo");
    if (!fs.existsSync(demoDirPath)) return;

    const demoOutputPath = path.join(
        FRONTEND_RESOURCE_PATH, 
        `docs/components/${outputComponentName}/demo`
    );
    fs.ensureDirSync(demoOutputPath);

    const files = fs.readdirSync(demoDirPath);
    const componentBaseName = fullComponentName.split('/').pop() || "";

    for (const file of files) {
        if (!file.endsWith(".ts")) continue;
        if (isMainConstantFile(file, componentBaseName)) {
            logSkip(fullComponentName, `demo/${file}`, "main constant file");
            continue;
        }

        const filePath = path.join(demoDirPath, file);
        const content = fs.readFileSync(filePath, "utf-8");

        if (isExportConstantFile(content)) {
            logSkip(fullComponentName, `demo/${file}`, "export constant");
            continue;
        }

        const mdFileName = file.replace(".ts", ".md");
        const mdFilePath = path.join(demoOutputPath, mdFileName);

        if (fs.existsSync(mdFilePath)) {
            logSkip(fullComponentName, `demo/${mdFileName}`, "already exists");
            continue;
        }

        const mdContent = createMarkdownContent(content);
        fs.writeFileSync(mdFilePath, mdContent, "utf-8");
        logSuccess(fullComponentName, `demo/${mdFileName}`, "Generated");
    }
}

function isMainConstantFile(fileName: string, componentBaseName: string): boolean {
    return fileName === `${componentBaseName}.ts`;
}

function isExportConstantFile(content: string): boolean {
    const hasExportConst = /export\s+const\s+[A-Z_]+\s*=\s*{/.test(content);
    const hasComponentDecorator = /@Component/.test(content);
    return hasExportConst && !hasComponentDecorator;
}

function createMarkdownContent(content: string): string {
    return `\`\`\`angular-ts showLineNumbers copyButton\n${content}\`\`\`\n`;
}

function copyDocFolder(
    componentDirPath: string, 
    fullComponentName: string,
    outputComponentName: string
): void {
    const sourceDirPath = path.join(componentDirPath, "doc");
    if (!fs.existsSync(sourceDirPath)) return;

    const destDirPath = path.join(
        FRONTEND_RESOURCE_PATH, 
        `docs/components/${outputComponentName}/doc`
    );
    fs.ensureDirSync(destDirPath);

    const files = fs.readdirSync(sourceDirPath);
    let copiedCount = 0;
    let skippedCount = 0;

    for (const file of files) {
        const sourceFilePath = path.join(sourceDirPath, file);
        const destFilePath = path.join(destDirPath, file);

        if (fs.statSync(sourceFilePath).isDirectory()) {
            fs.copySync(sourceFilePath, destFilePath, { overwrite: false });
            copiedCount++;
            continue;
        }

        if (fs.existsSync(destFilePath)) {
            skippedCount++;
            continue;
        }

        fs.copyFileSync(sourceFilePath, destFilePath);
        copiedCount++;
    }

    if (copiedCount > 0) {
        logSuccess(fullComponentName, "doc", `Copied ${copiedCount} file(s)`);
    }
    if (skippedCount > 0) {
        logSkip(fullComponentName, "doc", `${skippedCount} file(s) already exist`);
    }
}

function logSuccess(componentName: string, folder: string, message: string): void {
    console.log(`   ✓ ${message} ${componentName}/${folder}`);
}

function logSkip(componentName: string, folder: string, reason: string): void {
    console.log(`   ⏭️  Skipping ${componentName}/${folder} (${reason})`);
}
