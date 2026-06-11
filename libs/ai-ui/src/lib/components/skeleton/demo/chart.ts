import { Component } from "@angular/core";

import { AiSkeleton } from "../skeleton";

@Component({
    selector: "ai-demo-skeleton-chart",
    imports: [AiSkeleton],
    template: `
        <div class="max-w-sm w-full p-4 border border-border rounded-sm shadow-sm md:p-6">
            <ai-skeleton class="h-2.5 w-48 mb-2.5" />
            <ai-skeleton class="h-2 mb-10" />
            <div class="flex gap-x-4 items-baseline mt-4">
                <ai-skeleton class="h-72 w-full rounded-t-lg" />
                <ai-skeleton class="h-56 w-full rounded-t-lg" />
                <ai-skeleton class="h-64 w-full rounded-t-lg" />
                <ai-skeleton class="h-72 w-full rounded-t-lg" />
                <ai-skeleton class="h-48 w-full rounded-t-lg" />
                <ai-skeleton class="h-64 w-full rounded-t-lg" />
            </div>
        </div>
    `,
})
export class DemoSkeletonChartComponent {}
