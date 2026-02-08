import { Component, inject } from "@angular/core";
import { AiButton } from "../../button/button";
import { AiLoader } from "../loader";
import { AiLoaderService } from "../loader.service";

@Component({
    imports: [AiLoader, AiButton],
    template: `
        <div class="flex flex-col gap-y-4">
            <div class="flex items-center gap-x-6 w-full h-full justify-center">
                <div class="w-28 h-28 flex items-center justify-center">
                    <ai-loader type="dots" />
                </div>
                <div class="w-28 h-28 flex items-center justify-center">
                    <ai-loader type="spinner" />
                </div>
            </div>

            <div class="flex items-center justify-center gap-x-4">
                <ai-button size="sm" (click)="startLoading()" [loading]="loaderService.isLoading()">
                    {{ loaderService.isLoading() ? "loading..." : "start progress loader" }}
                </ai-button>
                @if (loaderService.isLoading()) {
                <ai-button size="sm" variant="destructive" (click)="stopLoading()"> stop </ai-button>
                }
            </div>

            <ai-loader type="progress" />
        </div>
    `,
})
export class DemoLoaderTypeComponent {
    loaderService = inject(AiLoaderService);

    startLoading() {
        this.loaderService.show();
        setTimeout(() => this.loaderService.hide(), 3000);
    }

    stopLoading() {
        this.loaderService.hide();
    }
}
