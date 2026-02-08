import { AiCommand } from "./command";
import { AiCommandEmpty } from "./command-empty";
import { AiCommandInput } from "./command-input";
import { AiCommandItem } from "./command-item";
import { AiCommandItemGroup } from "./command-item-group";
import { AiCommandList } from "./command-list";
import { AiCommandSeparator } from "./command-separator";

export const AiCommandImports = [AiCommand, AiCommandInput, AiCommandList, AiCommandItem, AiCommandItemGroup, AiCommandSeparator, AiCommandEmpty] as const;
