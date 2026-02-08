import { Injectable } from "@angular/core";
import { AiMaskConfig } from "./interfaces/mask-config.interface";

@Injectable({
    providedIn: "root",
})
export class AiCurrencyMaskService {
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
