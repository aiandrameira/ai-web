import { AiNormalizeConfig } from "../normalize.config";
import { NormalizeStrategy } from "./normalize.strategy";

export class AlfaNormalizeStrategy implements NormalizeStrategy {
    normalize(value: string, config?: AiNormalizeConfig): string {
        let extraChars = "";

        if (config?.hyphen) extraChars += "\\-";
        if (config?.underscore) extraChars += "_";
        if (config?.dot) extraChars += "\\.";

        const regex = new RegExp(`[^\\p{L}\\s${extraChars}]`, "gu");
        return value.replace(regex, "");
    }
}
