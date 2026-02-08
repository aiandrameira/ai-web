import type { SchemaPath } from "@angular/forms/signals";
import { validate } from "@angular/forms/signals";

const password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

export const RegexHelper = {
    password,
};

export type StrengthRule = { passed: boolean; message: string };
type InputType = "text" | "email" | "number" | "password";

export function passwordRegexs(minlength?: number | string): { value: string; message: string }[] {
    return [
        { value: "^(?=.*[A-Z])", message: "Deve conter letra maiúscula." },
        { value: "(?=.*[a-z])", message: "Deve conter letra minúscula." },
        { value: "(.*[0-9].*)", message: "Deve conter números." },
        { value: "(?=.*[!@#$%^&*])", message: "Deve conter símbolo." },
        { value: `(^.{${minlength},}$)`, message: `Deve conter no mínimo ${minlength} caracteres.` },
    ];
}

export function applyPasswordStrength(path: SchemaPath<string>, minlength = 8) {
    for (const rule of passwordRegexs(minlength)) {
        validate(path, ({ value }) => {
            const currentValue = String(value() ?? "");
            if (!currentValue) {
                return null;
            }

            const passed = new RegExp(rule.value).test(currentValue);
            return passed ? null : { kind: rule.value, message: rule.message };
        });
    }
}

export function buildStrengthRules(show: boolean, type: InputType, value: string | number | null, minlength?: string | number): StrengthRule[] {
    if (!show || type !== "password") return [];
    const currentValue = String(value ?? "");
    if (!currentValue) return [];

    const min = Number(minlength || 8);
    return passwordRegexs(min).map(rule => ({
        passed: new RegExp(rule.value).test(currentValue),
        message: rule.message,
    }));
}
