import { StepDto } from "./step.dto";

export interface InstallDto {
    env: string;
    title: string;
    description: string;
    steps: StepDto[];
}
