export interface AiMaskConfig {
    thousands?: string;
    decimal?: "." | "," | [".", ","];
    prefix?: string;
    align?: "left" | "right";
    dropSpecialCharacters?: boolean | string[] | (string[] | null);
    specialCharacters?: string[];
    isCurrency?: boolean;
    patterns?: any;
}
