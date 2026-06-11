```angular-ts showLineNumbers copyButton
import { Component, inject, signal } from "@angular/core";

import { AiUploadImports } from "../upload.imports";
import { AiFileUpload } from "../upload.interface";
import { AiFileUploadService } from "../upload.service";

@Component({
    selector: "ai-demo-upload-selected",
    imports: [AiUploadImports],
    template: `
        <div class="flex flex-col gap-y-6 w-full max-w-lg">
            <ai-upload class="w-full" [accept]="accept" (changeFile)="onChangeFile($event)" />

            @if (imageConfig()) {
                <ai-upload-selected type="card" [config]="imageConfig()" (remove)="imageConfig.set(null)" />
            }

            <ai-upload-selected type="card" [config]="docConfig()" (remove)="onDeleteDoc()" />
            <ai-upload-selected type="list" [config]="docConfig()" (remove)="onDeleteDoc()" />
        </div>
    `,
})
export class DemoUploadSelectedComponent {
    #fileUpload = inject(AiFileUploadService);

    accept = ".png, .jpg, .jpeg, .gif, .pdf";
    imageConfig = signal<AiFileUpload | null>(null);

    docConfig = signal<AiFileUpload>({
        name: "documento.pdf",
        size: "2.5 MB",
        base64: "",
    });

    async onChangeFile(file: File) {
        const result = await this.#fileUpload.readAsBase64(file);
        this.imageConfig.set(result);
    }

    onDeleteDoc() {
        console.log("Implementar o remover arquivo.");
    }
}
```
