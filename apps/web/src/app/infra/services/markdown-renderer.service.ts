import { firstValueFrom } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class MarkdownRendererService {
    #client = inject(HttpClient);

    async loadFromUrl(url: string): Promise<string> {
        try {
            return await firstValueFrom(this.#client.get(url, { responseType: "text" }));
        } catch {
            throw new Error(url);
        }
    }
}
