import { NgModule } from "@angular/core";

import { AiCommand } from "./command";
import { AiCommandEmpty } from "./command-empty";
import { AiCommandInput } from "./command-input";
import { AiCommandItem } from "./command-item";
import { AiCommandItemGroup } from "./command-item-group";
import { AiCommandList } from "./command-list";
import { AiCommandSeparator } from "./command-separator";

const components = [AiCommand, AiCommandInput, AiCommandList, AiCommandItem, AiCommandItemGroup, AiCommandSeparator, AiCommandEmpty] as const;
export const AiCommandImports = [...components];

@NgModule({
    imports: [...components],
    exports: [...components],
})
export class AiCommandModule {}
