import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "aiPrint",
})
export class AiPrintPipe<T> implements PipeTransform {
    transform(value: T): string {
        const json = JSON.stringify(value, null, 4);

        const escaped = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        return escaped.replace(/ /g, "&nbsp;").replace(/\n/g, "<br/>");
    }
}
