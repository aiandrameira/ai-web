import { NgModule } from "@angular/core";

import { AiUpload } from "./upload";
import { AiUploadSelected } from "./upload-selected";

const components = [AiUpload, AiUploadSelected] as const;
export const AiUploadImports = [...components];

@NgModule({
    imports: [...components],
    exports: [...components],
})
export class AiUploadModule {}
