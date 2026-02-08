```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";
import { AiLoader } from "../loader";

@Component({
    imports: [AiLoader],
    template: `
        <div class="w-full h-full flex flex-col justify-center items-center">
            <div class="flex items-center justify-center gap-6 w-150 h-40">
                <ai-loader type="dots" size="sm" />
                <ai-loader type="dots" size="md" />
                <ai-loader type="dots" size="default" />
                <ai-loader type="dots" size="lg" />
            </div>
            <div class="flex items-center justify-center gap-6 w-150 h-40">
                <ai-loader type="spinner" size="sm" />
                <ai-loader type="spinner" size="md" />
                <ai-loader type="spinner" size="default" />
                <ai-loader type="spinner" size="lg" />
            </div>
        </div>
    `,
})
export class DemoLoaderSizeComponent {}
```
