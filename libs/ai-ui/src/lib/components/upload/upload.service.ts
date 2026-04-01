import { Injectable } from "@angular/core";

import { AiFileUpload } from "./upload.interface";

@Injectable({
    providedIn: "root",
})
export class AiFileUploadService {
    readAsBase64(file: File): Promise<AiFileUpload<string>> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve({
                    file,
                    name: file.name,
                    base64: reader.result as string,
                    size: this._formatSize(file.size),
                });
            };
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(file);
        });
    }

    private _formatSize(bytes: number): string {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
    }
}
