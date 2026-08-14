import { Injectable } from "@angular/core";
import { AiMaskConfig } from "./interfaces/mask-config.interface";

@Injectable({
    providedIn: "root",
})
export class AiCurrencyMaskService {
    /**
     * Formats an actual decimal amount (e.g. 100 or 1234.5) into a currency display string.
     * Use this for values coming from outside user keystrokes (programmatic binding, form resets).
     */
    formatAmount(value: number, config: AiMaskConfig): string {
        if (value === null || value === undefined || Number.isNaN(value)) return "";

        const isNegative = value < 0;
        const decimalSeparator = typeof config.decimal === "string" ? config.decimal : Array.isArray(config.decimal) ? config.decimal[0] : ",";
        const [integer, decimalPart = "00"] = Math.abs(value).toFixed(2).split(".");

        const integerPart = integer.replace(/\B(?=(\d{3})+(?!\d))/g, config.thousands || ".");
        let formattedValue = integerPart + decimalSeparator + decimalPart;

        if (isNegative) formattedValue = "-" + formattedValue;
        if (config.prefix) formattedValue = config.prefix + " " + formattedValue;

        return formattedValue;
    }

    format(value: string | number, config: AiMaskConfig): string {
        if (value === null || value === undefined) return "";

        const strValue = String(value);
        const cleanedValue = strValue.replace(/[^\d]/g, "");

        if (cleanedValue.length === 0) return "";

        let formattedValue = "";
        const decimalIndex = cleanedValue.length - 2;
        let integerPart = cleanedValue.substring(0, decimalIndex);
        const decimalPart = cleanedValue.substring(decimalIndex);

        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, config.thousands || ".");
        formattedValue = integerPart + config.decimal + decimalPart;

        if (config.prefix) formattedValue = config.prefix + " " + formattedValue;

        return formattedValue;
    }

    /**
     * Converts raw typed text into the actual decimal amount it represents under the
     * digit-shifting scheme used by `format()` (last two digits are always the cents).
     */
    toNumber(value: string | number): number | null {
        if (value === null || value === undefined) return null;

        const digitsOnly = String(value).replace(/[^\d]/g, "");
        if (digitsOnly.length === 0) return null;

        return Number(digitsOnly) / 100;
    }

    clean(value: string | number, config: AiMaskConfig): string {
        if (value === null || value === undefined) return "";

        const strValue = String(value);
        let cleanedValue = strValue.replace(config.prefix || "", "").replace(new RegExp("\\" + (config.thousands || "."), "g"), "");

        const decimalSeparator = typeof config.decimal === "string" ? config.decimal : Array.isArray(config.decimal) ? config.decimal[0] : ",";

        cleanedValue = cleanedValue.replace(decimalSeparator, ".");
        cleanedValue = cleanedValue.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");

        return cleanedValue;
    }
}
