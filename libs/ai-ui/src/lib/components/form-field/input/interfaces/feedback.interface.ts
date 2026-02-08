import { ValidationError } from "@angular/forms/signals";
import { StrengthRule } from "./password-strength";

export type ErrorMessage = { kind?: string; message?: string };

type SignalErrors = readonly ValidationError.WithOptionalField[] | null | undefined;

export interface IFeedback {
    error: boolean;
    errorMessages: readonly ErrorMessage[];
    strengthRules: StrengthRule[];
    strength: boolean;
}

export function feedbackErrors(errors: SignalErrors, options: { custom?: { value: string; message: string }[]; minlength?: string | number } = {}): ErrorMessage[] {
    if (!errors || errors.length === 0) return [];

    const allMessages = [...(options.custom ?? [])];
    const out: ErrorMessage[] = [];
    const min = options.minlength;

    for (const error of errors) {
        const kind = error?.kind;
        if (!kind) continue;

        const def = allMessages.find(e => e.value === kind);

        if (def) {
            out.push({ kind, message: def.message });
            continue;
        }

        if (error.message) {
            out.push({ kind, message: error.message });
            continue;
        }

        if ((kind === "minlength" || kind === "minLength") && min) {
            out.push({ kind, message: `Este campo deve ter ao menos ${min} caracteres.` });
        }
    }

    return out;
}
