import { Command } from "commander";
import { add } from "./commands/add";
import { init } from "./commands/init";
import { appVersion } from "./constants/app-version.constant";

async function main() {
    const program = new Command().name("ai-web").description("add beautiful Angular components to your apps").version(appVersion, "-v, --version", "display the version number");

    program.addCommand(init).addCommand(add);

    program.parse();
}

main();
