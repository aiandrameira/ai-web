import { NormalizeStrategy } from "./normalize.strategy";

export class UppercaseNormalizeStrategy implements NormalizeStrategy {
    normalize(value: string): string {
        return value.toUpperCase();
    }
}
