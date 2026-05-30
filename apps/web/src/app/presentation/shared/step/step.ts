import { AiButton } from "@ai-ui/components";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { StepDto } from "@domain/dtos";

import { Markdown } from "../markdown/markdown";

@Component({
    selector: "ai-step",
    imports: [RouterLink, AiButton, Markdown],
    templateUrl: "./step.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Step {
    readonly stepProps = input<StepDto>();
    readonly position = input<number>();
}
