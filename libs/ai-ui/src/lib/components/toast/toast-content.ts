import { ChangeDetectionStrategy, Component, input, output, ViewEncapsulation } from "@angular/core";

import { AiIcon } from "../icon/icon.component";
import { AiToastConfig } from "./toast.config";
import { AiToastPipe } from "./toast.pipe";

@Component({
    selector: "ai-toast-content",
    exportAs: "aiToastContent",
    imports: [AiToastPipe, AiIcon],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    templateUrl: "./toast-content.html",
})
export class AiToastContent {
    toast = input<AiToastConfig>();
    undo = output<number>();
}
