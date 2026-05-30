import { ClassValue } from "clsx";

import { ChangeDetectionStrategy, Component, computed, ElementRef, input, output, viewChild, ViewEncapsulation } from "@angular/core";

import { mergeClasses, transform } from "../../core";
import { AiEmpty } from "../empty";
import { AiIcon } from "../icon";
import { AiFileUpload } from "./upload.interface";
import { uploadSelectedVariants, UploadSelectedVariants, uploadVariants, UploadVariants } from "./upload.variants";

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

@Component({
    selector: "ai-upload-selected",
    exportAs: "aiUploadSelected",
    imports: [AiIcon, AiEmpty],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        @if (configArray().length > 0) {
            @if (type() === "card") {
                <div class="flex flex-col gap-3 w-full">
                    @for (item of configArray(); track item.name) {
                        <div [class]="classes()">
                            @if (isImage(item)) {
                                <img [src]="item.base64" [alt]="item.name" class="w-full h-40 object-cover" />
                            } @else {
                                <div class="flex items-center justify-center h-40 bg-transparent">
                                    <ai-empty icon="file-text" [title]="item.name" description="Arquivo sem visualização" />
                                </div>
                            }
                            <div class="flex items-center justify-between gap-3 px-4 py-3 w-full">
                                <div class="flex items-center gap-2 min-w-0">
                                    <span class="text-sm font-semibold truncate max-w-[12em]">{{ item.name }}</span>
                                    @if (item.size) {
                                        <span class="text-xs text-muted-foreground shrink-0">{{ item.size }}</span>
                                    }
                                </div>
                                <button type="button" class="shrink-0 cursor-pointer text-muted-foreground hover:text-destructive transition-colors" (click)="remove.emit(item)">
                                    <ai-icon icon="delete-bin" size="sm" />
                                </button>
                            </div>
                        </div>
                    }
                </div>
            } @else {
                <div class="flex flex-col gap-2 w-full">
                    @for (item of configArray(); track item.name) {
                        <div [class]="classes()">
                            <ai-icon icon="file-text" class="shrink-0 text-muted-foreground" />
                            <div class="flex flex-col flex-1 min-w-0">
                                <span class="text-sm font-semibold truncate max-w-[12em]">{{ item.name }}</span>
                            </div>
                            @if (item.size) {
                                <span class="text-xs text-muted-foreground shrink-0">{{ item.size }}</span>
                            }
                            <button type="button" class="shrink-0 cursor-pointer text-muted-foreground hover:text-destructive transition-colors" (click)="remove.emit(item)">
                                <ai-icon icon="delete-bin" size="sm" />
                            </button>
                        </div>
                    }
                </div>
            }
        }
    `,
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
