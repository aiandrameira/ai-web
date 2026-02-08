import { NormalizeStrategy } from "./normalize.strategy";

export class NumericNormalizeStrategy implements NormalizeStrategy {
    normalize(value: string): string {
        return value.replace(/[^0-9]/g, "");
    }
}
