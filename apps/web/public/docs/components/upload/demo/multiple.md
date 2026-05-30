```angular-ts showLineNumbers copyButton
import { Component, inject, signal } from "@angular/core";

import { AiUpload, AiUploadSelected } from "../upload";
import { AiFileUpload } from "../upload.interface";
import { AiFileUploadService } from "../upload.service";

@Component({
    imports: [AiUpload, AiUploadSelected],
    template: `
        <div class="flex flex-col gap-4 w-full max-w-lg">
            <ai-upload class="w-full" [multiple]="true" [accept]="accept" (changeFiles)="onChangeFiles($event)" />

            @if (configs().length > 0) {
                <ai-upload-selected type="list" [config]="configs()" (remove)="onRemove($event)" />
            }
        </div>
    `,
})
export class DemoUploadMultipleComponent {
    #fileUpload = inject(AiFileUploadService);

    accept = ".png, .jpg, .jpeg, .gif, .pdf";
    configs = signal<AiFileUpload[]>([]);

    async onChangeFiles(files: File[]) {
        const results = await Promise.all(files.map(f => this.#fileUpload.readAsBase64(f)));
        this.configs.update(arr => [...arr, ...results]);
    }

    onRemove(item: AiFileUpload) {
        this.configs.update(arr => arr.filter(f => f !== item));
    }
}
```
