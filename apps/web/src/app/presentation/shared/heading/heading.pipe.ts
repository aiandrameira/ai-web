import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "heading",
})
export class HeadingPipe implements PipeTransform {
    transform(value: "h1" | "h2" | "h3" | "h4" | "h5"): string {
        switch (value) {
            case "h1":
                return "text-4xl sm:text-3xl xl:text-4xl";
            case "h2":
                return "text-3xl sm:text-2xl xl:text-3xl";
            case "h3":
                return "text-2xl sm:text-xl xl:text-2xl";
            case "h4":
                return "text-xl sm:text-lg xl:text-xl";
            case "h5":
                return "text-lg sm:text-base xl:text-lg";
            default:
                return "";
        }
    }
}
