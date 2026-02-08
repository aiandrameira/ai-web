import { AiNormalizeConfig } from "../normalize.config";

export interface NormalizeStrategy {
    normalize(value: string, config?: AiNormalizeConfig): string;
}
