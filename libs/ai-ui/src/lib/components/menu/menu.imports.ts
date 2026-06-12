import { OverlayModule } from "@angular/cdk/overlay";
import { NgModule } from "@angular/core";

import { AiMenu } from "./menu";
import { AiMenuContent } from "./menu-content";
import { AiMenuItem } from "./menu-item";
import { AiMenuLabel } from "./menu-label";
import { AiMenuShortcut } from "./menu-shortcut";
import { AiMenuDirective } from "./menu-trigger.directive";

const components = [AiMenuContent, AiMenuItem, AiMenuLabel, AiMenuShortcut, AiMenuDirective, AiMenu] as const;
export const AiMenuImports = [...components] as const;

@NgModule({
    imports: [OverlayModule, ...components],
    exports: [...components],
})
export class AiMenuModule {}
