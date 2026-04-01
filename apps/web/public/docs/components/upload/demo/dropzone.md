```angular-ts showLineNumbers copyButton
import { Component, inject, signal } from "@angular/core";

import { AiUpload, AiUploadSelected } from "../upload";
import { AiFileUpload } from "../upload.interface";
import { AiFileUploadService } from "../upload.service";

@Component({
    imports: [AiUpload, AiUploadSelected],
    template: `
        <div class="flex flex-col gap-4 w-full max-w-lg">
            <ai-upload class="w-full" type="dropzone" [accept]="accept" (changeFile)="onChangeFile($event)" />

            @if (config()) {
                <ai-upload-selected type="card" [config]="config()" (remove)="onDelete()" />
            }
        </div>
    `,
})
export class DemoUploadDropzoneComponent {
    #fileUpload = inject(AiFileUploadService);

    accept = ".png, .jpg, .jpeg, .gif";
    config = signal<AiFileUpload | null>(null);

    async onChangeFile(file: File) {
        const result = await this.#fileUpload.readAsBase64(file);
        this.config.set(result);
    }

    onDelete() {
        this.config.set(null);
    }
}
```
