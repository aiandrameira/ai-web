import { AiNormalizeConfig } from "../normalize.config";
import { NormalizeStrategy } from "./normalize.strategy";

export class AlfanumNormalizeStrategy implements NormalizeStrategy {
    normalize(value: string, config?: AiNormalizeConfig): string {
        let extraChars = "";

        if (config?.hyphen) extraChars += "\\-";
        if (config?.underscore) extraChars += "_";
        if (config?.dot) extraChars += "\\.";

        const regex = new RegExp(`[^\\p{L}0-9\\s${extraChars}]`, "gu");

        return value.replace(regex, "");
    }
}
