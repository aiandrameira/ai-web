import { ClassValue } from "clsx";

import { ChangeDetectionStrategy, Component, computed, ElementRef, input, output, viewChild, ViewEncapsulation } from "@angular/core";

import { mergeClasses, transform } from "../../core";
import { AiIcon } from "../icon";
import { uploadVariants, UploadVariants } from "./upload.variants";

@Component({
    selector: "ai-upload",
    exportAs: "aiUpload",
    imports: [AiIcon],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <input #fileInput type="file" class="hidden" [attr.id]="id() || null" [multiple]="multiple()" [accept]="accept()" (change)="onFileChange($event)" />
        @if (type() === "button") {
            <button [class]="classes()" (click)="fileInput.click()">
                <ai-icon icon="upload-cloud-2" size="lg" class="text-muted-foreground" />
                <div class="flex flex-col text-left">
                    <span class="text-sm font-medium">Fazer upload de arquivo</span>
                </div>
            </button>
            @if (accept()) {
                <span class="text-xs text-muted-foreground">Formatos de arquivos permitidos: {{ accept() }}.</span>
            }
        } @else {
            <button [class]="classes()" (click)="fileInput.click()" (dragover)="onDragOver($event)" (drop)="onDrop($event)">
                <ai-icon icon="upload-cloud-2" size="xl" class="text-muted-foreground" />
                <div class="text-center">
                    <span class="text-sm font-medium">Click para carregar ou arraste e solte</span>
                </div>
                @if (accept()) {
                    <span class="text-xs text-muted-foreground">Formatos de arquivos permitidos: {{ accept() }}</span>
                }
            </button>
        }
    `,
    host: {
        class: "block",
    },
})
export class AiUpload {
    readonly id = input<string>("");
    readonly type = input<UploadVariants["type"]>("button");
    readonly accept = input("");
    readonly multiple = input<boolean, string | boolean>(false, { transform });
    readonly disabled = input<boolean, string | boolean>(false, { transform });
    readonly class = input<ClassValue>("");

    readonly changeFile = output<File>();
    readonly changeFiles = output<File[]>();

    readonly fileInput = viewChild.required<ElementRef<HTMLInputElement>>("fileInput");

    protected readonly classes = computed(() => mergeClasses(uploadVariants({ type: this.type(), disabled: this.disabled() }), this.class()));

    onFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        const files = Array.from(input.files ?? []);
        if (files.length > 0) {
            this.changeFile.emit(files[0]);
            this.changeFiles.emit(files);
            input.value = "";
        }
    }

    onDragOver(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
    }

    onDrop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        const files = Array.from(event.dataTransfer?.files ?? []);
        if (files.length > 0) {
            this.changeFile.emit(files[0]);
            this.changeFiles.emit(files);
        }
    }
}
