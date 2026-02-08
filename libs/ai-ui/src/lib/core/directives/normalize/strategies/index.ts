import { AlfaNormalizeStrategy } from "./alfa.strategy";
import { AlfanumNormalizeStrategy } from "./alfanum.strategy";
import { NumericNormalizeStrategy } from "./numeric.strategy";
import { UppercaseNormalizeStrategy } from "./uppercase.strategy";

export const NORMALIZE_STRATEGIES = {
    alfa: new AlfaNormalizeStrategy(),
    alfanum: new AlfanumNormalizeStrategy(),
    numeric: new NumericNormalizeStrategy(),
    uppercase: new UppercaseNormalizeStrategy(),
};

export type AiNormalizeType = keyof typeof NORMALIZE_STRATEGIES;
