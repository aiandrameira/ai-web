import { NgModule } from "@angular/core";

import { AiTree } from "./tree";
import { AiTreeNodeComponent } from "./tree-node";

const components = [AiTreeNodeComponent, AiTree] as const;
export const AiTreeImports = [...components];

@NgModule({
    imports: [...components],
    exports: [...components],
})
export class AiTreeModule {}
