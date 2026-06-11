import { ClassValue } from "clsx";

import { ChangeDetectionStrategy, Component, computed, input, output, ViewEncapsulation } from "@angular/core";

import { mergeClasses } from "../../core";
import { AiEmpty } from "../empty";
import { AiIcon } from "../icon";
import { AiFileUpload } from "./upload.interface";
import { uploadSelectedVariants, UploadSelectedVariants } from "./upload.variants";

@Component({
    selector: "ai-upload-selected",
    exportAs: "aiUploadSelected",
    imports: [AiIcon, AiEmpty],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    templateUrl: "./upload-selected.html",
    host: {
        class: "block",
    },
})
export class AiUploadSelected {
    readonly config = input<AiFileUpload | AiFileUpload[] | null>(null);
    readonly type = input<UploadSelectedVariants["type"]>("list");
    readonly class = input<ClassValue>("");

    readonly remove = output<AiFileUpload>();

    protected readonly configArray = computed<AiFileUpload[]>(() => {
        const c = this.config();
        if (!c) return [];
        return Array.isArray(c) ? c : [c];
    });

    protected readonly classes = computed(() => mergeClasses(uploadSelectedVariants({ type: this.type() }), this.class()));

    protected isImage(item: AiFileUpload): boolean {
        return item.base64?.startsWith("data:image/") ?? false;
    }
}
